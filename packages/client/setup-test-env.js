import { createSerializer } from "jest-emotion";
import * as emotion from "emotion";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";

expect.addSnapshotSerializer(createSerializer(emotion));
