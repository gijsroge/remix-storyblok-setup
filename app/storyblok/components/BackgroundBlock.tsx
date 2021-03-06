import DynamicComponent from "~/storyblok/components/index";

export function component({ content }: { content: any }) {
  return (
    <div className={`bg-black text-white p-${content.padding}`}>
      {content?.body.map((component: any) => (
        <DynamicComponent key={component._uid} component={component} />
      ))}
    </div>
  );
}
