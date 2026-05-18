class Constellation < Formula
  desc "200 role-specific AI agents in 20 teams with typed artifact pipelines"
  homepage "https://github.com/IrfanSadiqRahat/constellation"
  url "https://registry.npmjs.org/constellation-agents/-/constellation-agents-0.2.0.tgz"
  sha256 "REPLACE_WITH_NPM_TARBALL_SHA256"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match "200", shell_output("#{bin}/constellation list --teams")
  end
end
