import {expect, test} from '@oclif/test'

describe('global-fields', () => {
  test
  .stdout()
  .command(['global-fields'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['global-fields', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
