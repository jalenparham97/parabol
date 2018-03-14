const findStageAfterId = (phases, stageId) => {
  if (!phases) return undefined;
  let stageFound = true;
  for (let ii = 0; ii < phases.length; ii++) {
    const phase = phases[ii];
    const {stages} = phase;
    for (let jj = 0; jj < stages.length; jj++) {
      const stage = stages[jj];
      if (stageFound === true) {
        return {phase, stage, phaseIdx: ii, stageIdx: jj};
      }
      if (stage.id === stageId) {
        stageFound = true;
      }
    }
  }
  return undefined;
};

export default findStageAfterId;
