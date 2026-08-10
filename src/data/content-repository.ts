import manifestData from './topic-manifest.generated.json';
import { applyConversationAdditions, type ConversationAdditions } from './content-expander';
import type { Topic, TopicManifestItem } from '../types/domain';

export interface TopicSummary extends TopicManifestItem {
  turnCount: number;
}

type CategoryLoader = () => Promise<Topic[]>;

function expand(topics: Topic[], additions: ConversationAdditions): Topic[] {
  return applyConversationAdditions(topics, additions);
}

async function loadScaledCategory(category: string): Promise<Topic[]> {
  const [batchBCore, batchBLife, batchCCore, batchCLife, batchDCore, batchDLife, batchECore, batchELife, batchFCore, batchFLife, batchGCore, batchGLife, batchHCore, batchHLife] = await Promise.all([
    import('./scale/batch-b-core'),
    import('./scale/batch-b-life'),
    import('./scale/batch-c-core'),
    import('./scale/batch-c-life'),
    import('./scale/batch-d-core'),
    import('./scale/batch-d-life'),
    import('./scale/batch-e-core'),
    import('./scale/batch-e-life'),
    import('./scale/batch-f-core'),
    import('./scale/batch-f-life'),
    import('./scale/batch-g-core'),
    import('./scale/batch-g-life'),
    import('./scale/batch-h-core'),
    import('./scale/batch-h-life'),
  ]);
  return [
    ...batchBCore.batchBCoreTopics,
    ...batchBLife.batchBLifeTopics,
    ...batchCCore.batchCCoreTopics,
    ...batchCLife.batchCLifeTopics,
    ...batchDCore.batchDCoreTopics,
    ...batchDLife.batchDLifeTopics,
    ...batchECore.batchECoreTopics,
    ...batchELife.batchELifeTopics,
    ...batchFCore.batchFCoreTopics,
    ...batchFLife.batchFLifeTopics,
    ...batchGCore.batchGCoreTopics,
    ...batchGLife.batchGLifeTopics,
    ...batchHCore.batchHCoreTopics,
    ...batchHLife.batchHLifeTopics,
  ].filter((topic) => topic.category === category);
}

const categoryLoaders: Record<string, CategoryLoader> = {
  'Daily Life': async () => {
    const [core, expanded, depth] = await Promise.all([
      import('./conversations/daily-life'),
      import('./conversations/daily-life-expanded'),
      import('./depth/additions-daily-food'),
    ]);
    return [...expand([...core.dailyLifeTopics, ...expanded.expandedDailyLifeTopics], depth.dailyFoodDepth), ...await loadScaledCategory('Daily Life')];
  },
  'Food & Drink': async () => {
    const [content, depth] = await Promise.all([import('./conversations/food-drink'), import('./depth/additions-daily-food')]);
    return [...expand(content.foodDrinkTopics, depth.dailyFoodDepth), ...await loadScaledCategory('Food & Drink')];
  },
  Transportation: async () => {
    const [content, depth] = await Promise.all([import('./conversations/transportation'), import('./depth/additions-transport-shopping')]);
    return [...expand(content.transportationTopics, depth.transportShoppingDepth), ...await loadScaledCategory('Transportation')];
  },
  Shopping: async () => {
    const [content, depth] = await Promise.all([import('./conversations/shopping'), import('./depth/additions-transport-shopping')]);
    return [...expand(content.shoppingTopics, depth.transportShoppingDepth), ...await loadScaledCategory('Shopping')];
  },
  Work: async () => {
    const [content, depth] = await Promise.all([import('./conversations/work'), import('./depth/additions-work-social')]);
    return [...expand(content.workTopics, depth.workSocialDepth), ...await loadScaledCategory('Work')];
  },
  'Friends & Social Life': async () => {
    const [core, combined, depth] = await Promise.all([
      import('./conversations/social-life'),
      import('./conversations/home-social'),
      import('./depth/additions-work-social'),
    ]);
    return [...expand([...core.socialLifeTopics, ...combined.homeSocialTopics].filter((topic) => topic.category === 'Friends & Social Life'), depth.workSocialDepth), ...await loadScaledCategory('Friends & Social Life')];
  },
  Home: async () => {
    const [content, depth] = await Promise.all([import('./conversations/home-social'), import('./depth/additions-home-services-travel-tech')]);
    return [...expand(content.homeSocialTopics.filter((topic) => topic.category === 'Home'), depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Home')];
  },
  Services: async () => {
    const [content, depth] = await Promise.all([import('./conversations/services-travel'), import('./depth/additions-home-services-travel-tech')]);
    return [...expand(content.servicesTravelTopics.filter((topic) => topic.category === 'Services'), depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Services')];
  },
  Travel: async () => {
    const [content, depth] = await Promise.all([import('./conversations/services-travel'), import('./depth/additions-home-services-travel-tech')]);
    return [...expand(content.servicesTravelTopics.filter((topic) => topic.category === 'Travel'), depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Travel')];
  },
  Technology: async () => {
    const [content, depth] = await Promise.all([import('./conversations/technology'), import('./depth/additions-home-services-travel-tech')]);
    return [...expand(content.technologyTopics, depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Technology')];
  },
  Family: async () => loadScaledCategory('Family'),
  Health: async () => loadScaledCategory('Health'),
  Education: async () => loadScaledCategory('Education'),
  Entertainment: async () => loadScaledCategory('Entertainment'),
  Community: async () => loadScaledCategory('Community'),
  Communication: async () => loadScaledCategory('Communication'),
  Fitness: async () => loadScaledCategory('Fitness'),
  Business: async () => loadScaledCategory('Business'),
  Environment: async () => loadScaledCategory('Environment'),
};

export interface ContentRepository {
  getTopicManifest(): readonly TopicSummary[];
  getTopic(id: string): Promise<Topic | undefined>;
}

export class ContentUnavailableError extends Error {
  constructor(public readonly category: string) {
    super(`Content for ${category} is not available offline yet.`);
    this.name = 'ContentUnavailableError';
  }
}

const cache = new Map<string, Promise<Topic[]>>();

function loadCategory(category: string): Promise<Topic[]> {
  const loader = categoryLoaders[category];
  if (!loader) return Promise.resolve([]);
  const cached = cache.get(category);
  if (cached) return cached;
  const request = loader().catch(() => {
    cache.delete(category);
    throw new ContentUnavailableError(category);
  });
  cache.set(category, request);
  return request;
}

export const topicManifest = manifestData as TopicSummary[];

export const contentRepository: ContentRepository = {
  getTopicManifest: () => topicManifest,
  getTopic: async (id) => {
    const summary = topicManifest.find((topic) => topic.id === id);
    if (!summary) return undefined;
    const topics = await loadCategory(summary.category);
    return topics.find((topic) => topic.id === id);
  },
};

export const loadTopic = contentRepository.getTopic;
