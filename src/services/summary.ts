import repo from './repo'

async function summary (dataset: string) {
  const data = await repo.findAll(dataset, '')
  
}