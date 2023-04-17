import {expect, test} from '@oclif/test'

describe('update/contenttype', () => {
  test
  .stdout()
  .command(['update/contenttype'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['update/contenttype', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
