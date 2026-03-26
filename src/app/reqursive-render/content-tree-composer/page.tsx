import ContentTreeComposer from "@/components/features/reqursive-render/content-tree-composer/ContentTreeComposer";
import { createRootNode } from "@/components/features/reqursive-render/composer-state/composerUtils";
import {contentNodeComponentProvider} from "@/components/features/reqursive-render/providers/providerIndex";
export default async function ContentTreeComposerPage() {
  const initialComponents = (await contentNodeComponentProvider.getAllComponents()) ?? [];

  return (
    <ContentTreeComposer
      initialTree={createRootNode()}
      initialComponents={initialComponents}
    />
  );
}
