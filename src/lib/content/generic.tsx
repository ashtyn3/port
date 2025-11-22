import { createResource, type Component } from "solid-js";
import { getPost } from "../posts/post";
import { StyledMarkdown } from "../../components/Markdown";

const GenericPost: Component<{ title: string }> = (props) => {
  const [res] = createResource(() => {
    return getPost(props.title);
  });

  return (
    <div>
      <StyledMarkdown content={res() || ""} />
    </div>
  );
};

export const createGenericPost = (title: string) => {
  return () => <GenericPost title={title} />;
};
