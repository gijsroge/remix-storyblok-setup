import { Form, useActionData, useLoaderData, useTransition } from "remix";
import { Transition } from "@remix-run/react/transition";

export async function loader(context: any) {
  const index = context.index;
  const response = await fetch(`https://dummyjson.com/products/${index}`);
  return await response.json();
}

export async function action(context: any) {
  return new Promise((resolve) => setTimeout(() => resolve(context), 1000));
}

export function component({ block }) {
  const transition = useTransition();
  const { data } = useLoaderData<any>();
  const actionData = useActionData();

  const scopedTransition = (): Transition => {
    if (transition?.submission?.formData.get("uid") === block._uid)
      return transition;
    return {} as Transition;
  };

  return (
    <div>
      {scopedTransition()?.state === "submitting" ? "hoi" : "meh"}
      <h1>{block.title}</h1>
      <Form method="post" action="?">
        <input type="hidden" value={block._uid} name="uid" />
        <input type="hidden" value={block.component} name="component" />
        <input type="text" name="title" />
        <input type="text" name="description" />
        <button disabled={scopedTransition()?.state === "submitting"}>
          Submit
        </button>
      </Form>
    </div>
  );
}