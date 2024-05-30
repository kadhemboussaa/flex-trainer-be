import { PartialType } from "@nestjs/mapped-types";
import { createSubscriptionPackDto } from "./create-subscriptionPack.dto";

export class updateSubscriptionPackDto extends PartialType(createSubscriptionPackDto){}