export const checkBoxConvert = (tools) => {
  let data = {
    premiere: false,
    aftereffect: false,
    finalcut: false,
    vegas: false,
    powerdirector: false,
    photoshop: false,
    illustrater: false,
    blender: false,
    maya: false,
  };
  tools.forEach((tool) => {
    if (tool === "프리미어 프로") {
      data = { ...data, premiere: true };
    }
    if (tool === "애프터이펙트") {
      data = { ...data, aftereffect: true };
    }
    if (tool === "파이널컷") {
      data = { ...data, finalcut: true };
    }
    if (tool === "베가스") {
      data = { ...data, vegas: true };
    }
    if (tool === "파워 디렉터") {
      data = { ...data, powerdirector: true };
    }
    if (tool === "포토샵") {
      data = { ...data, photoshop: true };
    }
    if (tool === "일러스트") {
      data = { ...data, illustrater: true };
    }
    if (tool === "블렌더") {
      data = { ...data, blender: true };
    }
    if (tool === "마야") {
      data = { ...data, maya: true };
    }
  });
  return data;
};
