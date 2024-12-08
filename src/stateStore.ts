import { atom } from "nanostores";

export const selectedPackage = atom("");

export function setPackage(packageChosen: string) {
  selectedPackage.set(packageChosen);
}
