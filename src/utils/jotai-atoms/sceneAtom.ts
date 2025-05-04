import { atom } from "jotai";
import * as THREE from "three";

export const sceneAtom = atom<THREE.Scene | null>(null);
export const exportModeAtom = atom(false);
