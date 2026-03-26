import { mockComponentRepository, mockTreeRepository } from "./providers";
import type {
	ContentNodeTreeRepository,
	ContentNodeComponentRepository,
} from "../interfaces/interfaces";

export const contentTreeNodeProvider: ContentNodeTreeRepository = mockTreeRepository;
export const contentNodeComponentProvider: ContentNodeComponentRepository = mockComponentRepository;