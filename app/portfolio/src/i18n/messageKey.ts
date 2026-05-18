import type { LeafPaths } from './leafPaths';
import type { Messages } from './messages/en';

/** All dot-paths to translatable strings (compile-time enforced). */
export type MessageKey = LeafPaths<Messages>;
