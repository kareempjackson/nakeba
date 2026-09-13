import { defineArrayMember, defineField, type FieldDefinition } from "sanity";

/**
 * Field builders for the two documents. Every field is required: the site
 * falls back to its original copy wherever a field is empty, so an empty
 * field would read to an editor as "I deleted this and it came back".
 * Requiring them keeps what's in the Studio and what's on the page the same.
 */

export const line = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "string",
    validation: (rule) => rule.required(),
  });

export const paragraph = (
  name: string,
  title: string,
  description?: string,
  rows = 4,
) =>
  defineField({
    name,
    title,
    description,
    type: "text",
    rows,
    validation: (rule) => rule.required(),
  });

export const url = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "url",
    validation: (rule) =>
      rule.required().uri({ scheme: ["http", "https", "mailto"] }),
  });

export const photo = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "accessibleImage",
    validation: (rule) => rule.required().assetRequired(),
  });

export const lines = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
    validation: (rule) => rule.required().min(1),
  });

export const paragraphs = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [defineArrayMember({ type: "text" })],
    validation: (rule) => rule.required().min(1),
  });

/** A page section: one object field, shown on its own tab. */
export const section = (
  name: string,
  title: string,
  fields: FieldDefinition[],
  description?: string,
) =>
  defineField({
    name,
    title,
    description,
    type: "object",
    group: name,
    options: { collapsible: false },
    fields,
  });
