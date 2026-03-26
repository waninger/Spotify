import ContentTreeComposer from "@/components/features/reqursive-render/content-tree-composer/ContentTreeComposer";
import { createRootNode } from "@/components/features/reqursive-render/composer-state/composerUtils";
import {contentNodeComponentProvider, contentTreeNodeProvider} from "@/components/features/reqursive-render/providers/providerIndex";
export default async function ContentTreeComposerPage() {
  const initialComponents = (await contentNodeComponentProvider.getAllComponents()) ?? [];
  const initialTree = (await contentTreeNodeProvider.fetchContentNodeTree()) ?? createRootNode();

  return (
    <ContentTreeComposer
      initialTree={initialTree}
      initialComponents={initialComponents}
    />
  );
}
