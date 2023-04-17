import {expect, test} from '@oclif/test'

describe('update/locales', () => {
  test
  .stdout()
  .command(['update/locales'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['update/locales', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
