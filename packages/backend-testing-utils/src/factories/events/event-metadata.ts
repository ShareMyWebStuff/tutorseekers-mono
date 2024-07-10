import { Factory } from "fishery";
// import { EventMetadata } from "@shieldpay/backend-events-sdk";

export interface EventMetadata {
  requestId: string;
  event: string;
  // system?: OriginSystem;
}

// eslint-disable-next-line no-empty-pattern
export const eventMetadataFactory = Factory.define<EventMetadata>(({}) => ({
  requestId: "req123",
  event: "eventName",
}));
