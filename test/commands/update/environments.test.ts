import {expect, test} from '@oclif/test'

describe('update/environments', () => {
  test
  .stdout()
  .command(['update/environments'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['update/environments', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
