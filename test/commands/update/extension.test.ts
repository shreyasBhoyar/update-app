import {expect, test} from '@oclif/test'

describe('update/extension', () => {
  test
  .stdout()
  .command(['update/extension'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['update/extension', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
