export const onRender = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.log(`id: ${id}`);
  console.log(`phase: ${phase}`);
  console.log(`actualDuration: ${actualDuration}`);
  console.log(`baseDuration: ${baseDuration}`);
  console.log(`startTime: ${startTime}`);
  console.log(`commitTime: ${commitTime}`);
};
