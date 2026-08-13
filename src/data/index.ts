import { dailyLifeTopics } from './conversations/daily-life';
import { expandedDailyLifeTopics } from './conversations/daily-life-expanded';
import { foodDrinkTopics } from './conversations/food-drink';
import { transportationTopics } from './conversations/transportation';
import { shoppingTopics } from './conversations/shopping';
import { workTopics } from './conversations/work';
import { socialLifeTopics } from './conversations/social-life';
import { homeSocialTopics } from './conversations/home-social';
import { servicesTravelTopics } from './conversations/services-travel';
import { technologyTopics } from './conversations/technology';
import { applyConversationAdditions } from './content-expander';
import { dailyFoodDepth } from './depth/additions-daily-food';
import { transportShoppingDepth } from './depth/additions-transport-shopping';
import { workSocialDepth } from './depth/additions-work-social';
import { homeServicesTravelTechDepth } from './depth/additions-home-services-travel-tech';
import { batchBCoreTopics } from './scale/batch-b-core';
import { batchBLifeTopics } from './scale/batch-b-life';
import { batchCCoreTopics } from './scale/batch-c-core';
import { batchCLifeTopics } from './scale/batch-c-life';
import { batchDCoreTopics } from './scale/batch-d-core';
import { batchDLifeTopics } from './scale/batch-d-life';
import { batchECoreTopics } from './scale/batch-e-core';
import { batchELifeTopics } from './scale/batch-e-life';
import { batchFCoreTopics } from './scale/batch-f-core';
import { batchFLifeTopics } from './scale/batch-f-life';
import { batchGCoreTopics } from './scale/batch-g-core';
import { batchGLifeTopics } from './scale/batch-g-life';
import { batchHCoreTopics } from './scale/batch-h-core';
import { batchHLifeTopics } from './scale/batch-h-life';
import { batchATransportHomeTopics } from './scale/batch-a-transport-home';
import { batchAHomeWorkTopics } from './scale/batch-a-home-work';
import { batchAWorkAdvancedTopics } from './scale/batch-a-work-advanced';
import { batchAMoneyServicesTopics } from './scale/batch-a-money-services';
import { batchAFamilyHealthTechTopics } from './scale/batch-a-family-health-tech';
import { batchATechFoodLeisureTopics } from './scale/batch-a-tech-food-leisure';
import { batchADailyEducationTravelTopics } from './scale/batch-a-daily-education-travel';
import { batchBExpansionHealthMoneyTopics } from './scale/batch-b-expansion-health-money';
import { batchBExpansionEducationTechnologyTopics } from './scale/batch-b-expansion-education-technology';
import { batchBExpansionTravelServicesTopics } from './scale/batch-b-expansion-travel-services';
import { batchBExpansionFamilyCommunityTopics } from './scale/batch-b-expansion-family-community';
import { batchCCommunicationPublicTopics } from './scale/batch-c-communication-public';
import { batchCEventsFitnessTopics } from './scale/batch-c-events-fitness';
import { batchCProfessionalTopics } from './scale/batch-c-professional';
import { batchCTravelEmergencyTopics } from './scale/batch-c-travel-emergency';
import { hardenAcceptedAnswers } from './accepted-answer-hardening';
import { batchD1EverydayServicesTopics } from './scale/batch-d1-everyday-services';
import { batchD2HomeMoneyTopics } from './scale/batch-d2-home-money';
import { batchD3SupportDiplomacyTopics } from './scale/batch-d3-support-diplomacy';
import { batchD4TravelCommunityTopics } from './scale/batch-d4-travel-community';
import type { Topic, TopicManifestItem } from '../types/domain';

const baseTopics = [...dailyLifeTopics, ...expandedDailyLifeTopics, ...foodDrinkTopics, ...transportationTopics, ...shoppingTopics, ...workTopics, ...socialLifeTopics, ...homeSocialTopics, ...servicesTravelTopics, ...technologyTopics, ...batchBCoreTopics, ...batchBLifeTopics, ...batchCCoreTopics, ...batchCLifeTopics, ...batchDCoreTopics, ...batchDLifeTopics, ...batchECoreTopics, ...batchELifeTopics, ...batchFCoreTopics, ...batchFLifeTopics, ...batchGCoreTopics, ...batchGLifeTopics, ...batchHCoreTopics, ...batchHLifeTopics, ...batchATransportHomeTopics, ...batchAHomeWorkTopics, ...batchAWorkAdvancedTopics, ...batchAMoneyServicesTopics, ...batchAFamilyHealthTechTopics, ...batchATechFoodLeisureTopics, ...batchADailyEducationTravelTopics, ...batchBExpansionHealthMoneyTopics, ...batchBExpansionEducationTechnologyTopics, ...batchBExpansionTravelServicesTopics, ...batchBExpansionFamilyCommunityTopics, ...batchCCommunicationPublicTopics, ...batchCEventsFitnessTopics, ...batchCProfessionalTopics, ...batchCTravelEmergencyTopics, ...batchD1EverydayServicesTopics, ...batchD2HomeMoneyTopics, ...batchD3SupportDiplomacyTopics, ...batchD4TravelCommunityTopics];
const depthAdditions = {
  ...dailyFoodDepth,
  ...transportShoppingDepth,
  ...workSocialDepth,
  ...homeServicesTravelTechDepth,
};

const topicLoaders: Record<string, () => Promise<Topic | undefined>> = Object.fromEntries(
  baseTopics.map((topic) => [topic.id, async () => topics.find((item) => item.id === topic.id)]),
);

export const topics: Topic[] = hardenAcceptedAnswers(applyConversationAdditions(baseTopics, depthAdditions));
export const topicManifest: TopicManifestItem[] = topics.map(({ conversations, ...topic }) => ({
  ...topic,
  conversationCount: conversations.length,
}));

export async function loadTopic(id: string): Promise<Topic | undefined> {
  return topicLoaders[id]?.();
}

export function findTurn(turnId: string) {
  for (const topic of topics) {
    for (const conversation of topic.conversations) {
      const turn = conversation.turns.find((item) => item.id === turnId);
      if (turn) return { topic, conversation, turn };
    }
  }
  return undefined;
}
