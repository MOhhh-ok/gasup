import { execSync } from 'child_process';

export function deploy() {
  const currentDeployments = getCurrentDeployments();
  const latestDeployment = currentDeployments[0];
  if (latestDeployment) {
    console.log(
      'deploy to latest: ' +
        latestDeployment.id +
        ' ' +
        latestDeployment.version
    );
    execSync('clasp deploy -i ' + latestDeployment.id);
  } else {
    console.log('deploy new version');
    execSync('clasp deploy');
  }
}

function getCurrentDeployments() {
  const res = execSync('clasp deployments').toString();
  const lines = res.split('\n');
  const deployments = lines
    .filter((line) => line.startsWith('-'))
    .map((line) => {
      const [_, id, versionStr] = line.split(' ');
      return { id, version: Number(versionStr.replace(/[^\d]/g, '')) };
    });
  return deployments.sort((a, b) => b.version - a.version);
}
