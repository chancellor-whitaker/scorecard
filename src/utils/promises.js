import { csv } from "d3-fetch";

export const promises = {
  glossary: csv("data/glossary.csv"),
  table1: csv("data/table1.csv"),
  table2: csv("data/table2.csv"),
};
