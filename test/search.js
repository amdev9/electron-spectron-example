const path = require('path');
const os = require('os');
const fs = require('fs');
const hooks = require('./hooks');
var expect = require('chai').expect;

describe('Sample Test', () => {
  let app;

  beforeEach(async () => {
    app = await hooks.startApp();
  });

  afterEach(async() => {
    await hooks.stopApp(app);
  });

  it('opens a window', async() => {
    await app.client.waitUntilWindowLoaded()
      .getWindowCount()
      .should.eventually.equal(1);
  });

  it('h1 tag exists', async() => {
    await app.client.waitUntilWindowLoaded()
      .waitForVisible('h1').should.eventually.be.true;
  });

  it('test tag exists', async() => {
    await app.client.waitUntilWindowLoaded()
      .waitForVisible('#test').should.eventually.be.true;
  });

  it('creates tmp directory', function ( ) {
    const tmpDir = path.join(os.tmpdir(), 'test');
    return app.client.waitUntilWindowLoaded()
      .waitForVisible('#test').should.eventually.be.true
      .then(function() {
        expect(fs.existsSync(tmpDir)).to.equal(true);
         
      })  
  })
});
