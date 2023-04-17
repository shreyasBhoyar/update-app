import {expect, test} from '@oclif/test'

describe('update/assets', () => {
  test
  .stdout()
  .command(['update/assets'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['update/assets', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
