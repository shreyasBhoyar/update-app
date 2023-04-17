import {expect, test} from '@oclif/test'

describe('update/global-fields', () => {
  test
  .stdout()
  .command(['update/global-fields'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['update/global-fields', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
