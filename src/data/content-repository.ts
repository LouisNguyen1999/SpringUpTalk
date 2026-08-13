import manifestData from './topic-manifest.generated.json';
import { applyConversationAdditions, type ConversationAdditions } from './content-expander';
import type { Topic, TopicManifestItem } from '../types/domain';
import { hardenAcceptedAnswers } from './accepted-answer-hardening';

export interface TopicSummary extends TopicManifestItem {
  turnCount: number;
  searchText: string;
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

async function loadBatchACategory(category:string):Promise<Topic[]> {
  const modules:Topic[][] = [];
  if (category === 'Transportation' || category === 'Home') {
    const batch = await import('./scale/batch-a-transport-home');
    modules.push(batch.batchATransportHomeTopics);
  }
  if (category === 'Home' || category === 'Work') {
    const batch = await import('./scale/batch-a-home-work');
    modules.push(batch.batchAHomeWorkTopics);
  }
  if (category === 'Work' || category === 'Money & Banking') {
    const batch = await import('./scale/batch-a-work-advanced');
    modules.push(batch.batchAWorkAdvancedTopics);
  }
  if (category === 'Money & Banking' || category === 'Services') {
    const batch = await import('./scale/batch-a-money-services');
    modules.push(batch.batchAMoneyServicesTopics);
  }
  if (category === 'Family' || category === 'Health' || category === 'Technology') {
    const batch = await import('./scale/batch-a-family-health-tech');
    modules.push(batch.batchAFamilyHealthTechTopics);
  }
  if (category === 'Technology' || category === 'Food & Drink' || category === 'Entertainment' || category === 'Fitness') {
    const batch = await import('./scale/batch-a-tech-food-leisure');
    modules.push(batch.batchATechFoodLeisureTopics);
  }
  if (category === 'Daily Life' || category === 'Education' || category === 'Travel' || category === 'Community' || category === 'Technology') {
    const batch = await import('./scale/batch-a-daily-education-travel');
    modules.push(batch.batchADailyEducationTravelTopics);
  }
  return modules.flat().filter((topic) => topic.category === category);
}

async function loadBatchBExpansionCategory(category:string):Promise<Topic[]> {
  const modules:Topic[][]=[];
  if (category === 'Health' || category === 'Money & Banking') {
    const batch = await import('./scale/batch-b-expansion-health-money');
    modules.push(batch.batchBExpansionHealthMoneyTopics);
  }
  if (category === 'Education' || category === 'Technology') {
    const batch = await import('./scale/batch-b-expansion-education-technology');
    modules.push(batch.batchBExpansionEducationTechnologyTopics);
  }
  if (category === 'Travel' || category === 'Services') {
    const batch = await import('./scale/batch-b-expansion-travel-services');
    modules.push(batch.batchBExpansionTravelServicesTopics);
  }
  if (category === 'Family' || category === 'Community') {
    const batch = await import('./scale/batch-b-expansion-family-community');
    modules.push(batch.batchBExpansionFamilyCommunityTopics);
  }
  return modules.flat().filter((topic) => topic.category === category);
}

async function loadBatchCCategory(category:string):Promise<Topic[]> {
  const modules:Topic[][]=[];
  if (category === 'Communication' || category === 'Public Places' || category === 'Professional Communication') {
    const batch = await import('./scale/batch-c-communication-public');
    modules.push(batch.batchCCommunicationPublicTopics);
  }
  if (category === 'Events' || category === 'Entertainment' || category === 'Fitness' || category === 'Shopping') {
    const batch = await import('./scale/batch-c-events-fitness');
    modules.push(batch.batchCEventsFitnessTopics);
  }
  if (category === 'Professional Communication' || category === 'Work') {
    const batch = await import('./scale/batch-c-professional');
    modules.push(batch.batchCProfessionalTopics);
  }
  if (category === 'Travel' || category === 'Emergencies') {
    const batch = await import('./scale/batch-c-travel-emergency');
    modules.push(batch.batchCTravelEmergencyTopics);
  }
  return modules.flat().filter((topic) => topic.category === category);
}

async function loadBatchDCategory(category:string):Promise<Topic[]> {
  const [d1,d2,d3,d4]=await Promise.all([
    import('./scale/batch-d1-everyday-services'),
    import('./scale/batch-d2-home-money'),
    import('./scale/batch-d3-support-diplomacy'),
    import('./scale/batch-d4-travel-community'),
  ]);
  return [
    ...d1.batchD1EverydayServicesTopics,
    ...d2.batchD2HomeMoneyTopics,
    ...d3.batchD3SupportDiplomacyTopics,
    ...d4.batchD4TravelCommunityTopics,
  ].filter((topic) => topic.category === category);
}

const categoryLoaders: Record<string, CategoryLoader> = {
  'Daily Life': async () => {
    const [core, expanded, depth] = await Promise.all([
      import('./conversations/daily-life'),
      import('./conversations/daily-life-expanded'),
      import('./depth/additions-daily-food'),
    ]);
    return [...expand([...core.dailyLifeTopics, ...expanded.expandedDailyLifeTopics], depth.dailyFoodDepth), ...await loadScaledCategory('Daily Life'), ...await loadBatchACategory('Daily Life')];
  },
  'Food & Drink': async () => {
    const [content, depth] = await Promise.all([import('./conversations/food-drink'), import('./depth/additions-daily-food')]);
    return [...expand(content.foodDrinkTopics, depth.dailyFoodDepth), ...await loadScaledCategory('Food & Drink'), ...await loadBatchACategory('Food & Drink')];
  },
  Transportation: async () => {
    const [content, depth] = await Promise.all([import('./conversations/transportation'), import('./depth/additions-transport-shopping')]);
    return [...expand(content.transportationTopics, depth.transportShoppingDepth), ...await loadScaledCategory('Transportation'), ...await loadBatchACategory('Transportation')];
  },
  Shopping: async () => {
    const [content, depth] = await Promise.all([import('./conversations/shopping'), import('./depth/additions-transport-shopping')]);
    return [...expand(content.shoppingTopics, depth.transportShoppingDepth), ...await loadScaledCategory('Shopping'), ...await loadBatchCCategory('Shopping')];
  },
  Work: async () => {
    const [content, depth] = await Promise.all([import('./conversations/work'), import('./depth/additions-work-social')]);
    return [...expand(content.workTopics, depth.workSocialDepth), ...await loadScaledCategory('Work'), ...await loadBatchACategory('Work'), ...await loadBatchCCategory('Work')];
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
    return [...expand(content.homeSocialTopics.filter((topic) => topic.category === 'Home'), depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Home'), ...await loadBatchACategory('Home')];
  },
  'Money & Banking': async () => [...await loadBatchACategory('Money & Banking'), ...await loadBatchBExpansionCategory('Money & Banking')],
  Services: async () => {
    const [content, depth] = await Promise.all([import('./conversations/services-travel'), import('./depth/additions-home-services-travel-tech')]);
    return [...expand(content.servicesTravelTopics.filter((topic) => topic.category === 'Services'), depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Services'), ...await loadBatchACategory('Services'), ...await loadBatchBExpansionCategory('Services')];
  },
  Travel: async () => {
    const [content, depth] = await Promise.all([import('./conversations/services-travel'), import('./depth/additions-home-services-travel-tech')]);
    return [...expand(content.servicesTravelTopics.filter((topic) => topic.category === 'Travel'), depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Travel'), ...await loadBatchACategory('Travel'), ...await loadBatchBExpansionCategory('Travel'), ...await loadBatchCCategory('Travel')];
  },
  Technology: async () => {
    const [content, depth] = await Promise.all([import('./conversations/technology'), import('./depth/additions-home-services-travel-tech')]);
    return [...expand(content.technologyTopics, depth.homeServicesTravelTechDepth), ...await loadScaledCategory('Technology'), ...await loadBatchACategory('Technology'), ...await loadBatchBExpansionCategory('Technology')];
  },
  Family: async () => [...await loadScaledCategory('Family'), ...await loadBatchACategory('Family'), ...await loadBatchBExpansionCategory('Family')],
  Health: async () => [...await loadScaledCategory('Health'), ...await loadBatchACategory('Health'), ...await loadBatchBExpansionCategory('Health')],
  Education: async () => [...await loadScaledCategory('Education'), ...await loadBatchACategory('Education'), ...await loadBatchBExpansionCategory('Education')],
  Entertainment: async () => [...await loadScaledCategory('Entertainment'), ...await loadBatchACategory('Entertainment'), ...await loadBatchCCategory('Entertainment')],
  Community: async () => [...await loadScaledCategory('Community'), ...await loadBatchACategory('Community'), ...await loadBatchBExpansionCategory('Community')],
  Communication: async () => [...await loadScaledCategory('Communication'), ...await loadBatchCCategory('Communication')],
  Fitness: async () => [...await loadScaledCategory('Fitness'), ...await loadBatchACategory('Fitness'), ...await loadBatchCCategory('Fitness')],
  Business: async () => loadScaledCategory('Business'),
  Environment: async () => loadScaledCategory('Environment'),
  Events: async () => loadBatchCCategory('Events'),
  'Public Places': async () => loadBatchCCategory('Public Places'),
  'Professional Communication': async () => loadBatchCCategory('Professional Communication'),
  Emergencies: async () => loadBatchCCategory('Emergencies'),
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
  const request = Promise.all([loader(),loadBatchDCategory(category)]).then(([existing,batchD]) => hardenAcceptedAnswers([...existing,...batchD])).catch(() => {
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
