require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platforms    = { :ios => "9.0", :tvos => "9.0" }

  s.source       = { :git => package['homepage'], :tag => "#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"

  s.requires_arc = true

  s.dependency "React"
  s.resource = '/AliPay/AlipaySDK.bundle'
  s.vendored_libraries = "/AliPay/libAlipaySDK.a"
  s.frameworks = "SystemConfiguration", "CoreTelephony", "QuartzCore", "CoreText", "CoreGraphics", "UIKit", "Foundation", "CFNetwork", "CoreMotion"
  s.library = "c++", "z"
end
