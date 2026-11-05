"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { DoubleSide, Object3D, Shape, ShapeGeometry, type Group, type InstancedMesh } from "three";
import { learning } from "@/data/resume";
import { usePalette, useReducedMotion } from "../palette";
import { useScene } from "../store";

type Leaf = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: 0 | 1;
  newIndex?: number;
  label?: string;
};

const baseLeaves: Leaf[] = [
  { position: [0.005, 0.13, 0], rotation: [-0.12, 0.25, 0.42], scale: 1.04, color: 0 },
  { position: [-0.01, 0.2, 0.005], rotation: [0.1, 2.7, -0.38], scale: 0.95, color: 1 },
  { position: [0.008, 0.28, 0], rotation: [-0.08, 4.8, 0.34], scale: 1.08, color: 0 },
  { position: [-0.002, 0.36, 0.006], rotation: [0.13, 1.6, -0.31], scale: 0.98, color: 1 },
  { position: [0.006, 0.44, 0], rotation: [-0.1, 3.7, 0.3], scale: 1.02, color: 0 },
  { position: [0.002, 0.52, 0.004], rotation: [0.12, 5.7, -0.28], scale: 0.92, color: 1 },
  { position: [0.005, 0.6, 0], rotation: [-0.08, 2.25, 0.27], scale: 1.0, color: 0 },
  { position: [0, 0.68, 0.003], rotation: [0.1, 4.2, -0.25], scale: 0.91, color: 1 },
  { position: [-0.03, 0.18, 0.015], rotation: [0.12, 3.2, -0.34], scale: 0.88, color: 0 },
  { position: [-0.05, 0.27, 0.012], rotation: [-0.1, 0.7, 0.31], scale: 0.94, color: 1 },
  { position: [-0.065, 0.36, 0.01], rotation: [0.08, 5.15, -0.3], scale: 0.86, color: 0 },
  { position: [-0.075, 0.45, 0.008], rotation: [-0.12, 2.0, 0.28], scale: 0.9, color: 1 },
  { position: [-0.082, 0.54, 0.005], rotation: [0.1, 4.0, -0.25], scale: 0.84, color: 0 },
  { position: [0.002, 0.735, 0], rotation: [-0.08, 0.9, 0.18], scale: 0.86, color: 1 },
];

const newLeaves: Leaf[] = learning.map((item, index) => ({
  position: [index === 1 ? -0.018 : 0.01, 0.7 + index * 0.035, index === 2 ? -0.008 : 0.006],
  rotation: [index % 2 ? 0.1 : -0.1, 2.35 + index * 1.9, index === 1 ? -0.2 : 0.22],
  scale: 0.84 + index * 0.035,
  color: (index % 2) as 0 | 1,
  newIndex: index,
  label: item.title,
}));

const leafBatches = [
  [...baseLeaves, ...newLeaves].filter((leaf) => leaf.color === 0),
  [...baseLeaves, ...newLeaves].filter((leaf) => leaf.color === 1),
];

function createLeafGeometry() {
  // ponytail: one shallow-bent plane per leaf is enough here; add a second fold only if the profile reads flat.
  const leaf = new Shape();
  leaf.moveTo(0, 0);
  leaf.bezierCurveTo(0.045, 0.012, 0.064, 0.06, 0.05, 0.098);
  leaf.bezierCurveTo(0.043, 0.132, 0.018, 0.155, 0, 0.16);
  leaf.bezierCurveTo(-0.018, 0.155, -0.043, 0.132, -0.05, 0.098);
  leaf.bezierCurveTo(-0.064, 0.06, -0.045, 0.012, 0, 0);
  const geometry = new ShapeGeometry(leaf, 8);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const widthFade = Math.max(0, 1 - (x * x) / (0.06 * 0.06));
    position.setZ(i, Math.sin((y / 0.16) * Math.PI) * widthFade * 0.011);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function setLeafMatrix(mesh: InstancedMesh, index: number, leaf: Leaf, growth: number, dummy: Object3D) {
  dummy.position.set(...leaf.position);
  dummy.rotation.set(...leaf.rotation);
  const scale = leaf.scale * growth;
  dummy.scale.set(scale, scale, scale);
  dummy.updateMatrix();
  mesh.setMatrixAt(index, dummy.matrix);
}

export function Plant() {
  const p = usePalette();
  const reduced = useReducedMotion();
  const section = useScene((state) => state.section);
  const livePlant = useRef<Group>(null);
  const darkLeaves = useRef<InstancedMesh>(null);
  const lightLeaves = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const geometry = useMemo(() => createLeafGeometry(), []);
  const growth = useRef(learning.map(() => ({ value: 0 })));
  const animation = useRef({ active: false, elapsed: 0, dirty: false });
  const grown = useRef(false);

  useLayoutEffect(() => {
    const meshes = [darkLeaves.current, lightLeaves.current];
    leafBatches.forEach((batch, color) => {
      const mesh = meshes[color];
      if (!mesh) return;
      batch.forEach((leaf, index) => {
        const amount = leaf.newIndex === undefined ? 1 : growth.current[leaf.newIndex].value;
        setLeafMatrix(mesh, index, leaf, amount, dummy);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [dummy, reduced]);

  useEffect(() => {
    if (reduced && animation.current.active) {
      growth.current.forEach((item) => (item.value = 1));
      grown.current = true;
      animation.current.active = false;
      animation.current.dirty = true;
    }
    if (section !== "skills" || grown.current) return;
    if (reduced) {
      growth.current.forEach((item) => (item.value = 1));
      grown.current = true;
      animation.current.dirty = true;
    } else {
      animation.current.active = true;
      animation.current.elapsed = 0;
    }
  }, [reduced, section]);

  useFrame((state, delta) => {
    const plant = livePlant.current;
    if (plant) {
      if (reduced) plant.rotation.z = 0;
      else easing.damp(plant.rotation, "z", Math.sin(state.clock.elapsedTime * 0.55) * 0.015, 0.5, delta);
    }

    const motion = animation.current;
    if (!motion.active && !motion.dirty) return;
    if (motion.active) {
      motion.elapsed += delta;
      growth.current.forEach((item, index) => {
        const target = motion.elapsed >= index * 0.25 ? 1 : 0;
        easing.damp(item, "value", target, 0.16, delta);
      });
      if (motion.elapsed > (learning.length - 1) * 0.25 && growth.current.every((item) => item.value > 0.995)) {
        growth.current.forEach((item) => (item.value = 1));
        grown.current = true;
        motion.active = false;
      }
    }

    const meshes = [darkLeaves.current, lightLeaves.current];
    leafBatches.forEach((batch, color) => {
      const mesh = meshes[color];
      if (!mesh) return;
      batch.forEach((leaf, index) => {
        if (leaf.newIndex !== undefined) setLeafMatrix(mesh, index, leaf, growth.current[leaf.newIndex].value, dummy);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
    motion.dirty = false;
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.17, 0.13, 0.36, 32]} />
        <meshStandardMaterial color={p.ceramic} roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.361, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[0.158, 32]} />
        <meshStandardMaterial color={p.soil} roughness={1} />
      </mesh>
      {/* The live portion pivots just above the soil, leaving the pot reassuringly still. */}
      <group ref={livePlant} position={[0, 0.34, 0]}>
        <mesh position={[0, 0.39, 0]} castShadow>
          <cylinderGeometry args={[0.009, 0.013, 0.78, 10]} />
          <meshStandardMaterial color={p.woodDark} roughness={0.86} />
        </mesh>
        <mesh position={[-0.052, 0.275, 0.01]} rotation-z={0.1}>
          <cylinderGeometry args={[0.006, 0.009, 0.55, 9]} />
          <meshStandardMaterial color={p.woodDark} roughness={0.86} />
        </mesh>
        <instancedMesh ref={darkLeaves} args={[geometry, undefined, leafBatches[0].length]} dispose={null}>
          <meshStandardMaterial color={p.leaf} roughness={0.82} side={DoubleSide} />
        </instancedMesh>
        <instancedMesh ref={lightLeaves} args={[geometry, undefined, leafBatches[1].length]} dispose={null}>
          <meshStandardMaterial color={p.leafLight} roughness={0.82} side={DoubleSide} />
        </instancedMesh>
      </group>
    </group>
  );
}
