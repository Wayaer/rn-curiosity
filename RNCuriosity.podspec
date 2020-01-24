require 'json'

package = JSON.parse(File.read(File.join(__dir__, './package.json')))

Pod::Spec.new do |s|
  s.name         = package['pod']
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']
  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platforms    = { :ios => "9.0", :tvos => "9.0" }
  s.source       = { :git => package['homepage'], :tag => "#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}","ios/**/minizip/*.{c,h}"
  s.dependency "React","AlipaySDK"
  s.resource = 'AlipaySDK.bundle'
  s.vendored_frameworks = "ios/AliPay/AlipaySDK"
  s.frameworks = "Security","SystemConfiguration", "CoreTelephony", "QuartzCore", "CoreText", "CoreGraphics", "UIKit", "Foundation", "CFNetwork", "CoreMotion"
  s.library = "c++",'z', 'iconv'
end
