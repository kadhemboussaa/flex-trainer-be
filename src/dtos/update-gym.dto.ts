import { PartialType } from "@nestjs/mapped-types";
import { createGymDto } from "./create-gym.dto";

export class updateGymDto extends PartialType(createGymDto){} 