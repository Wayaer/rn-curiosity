require 'json'

package = JSON.parse(File.read(File.join(__dir__, './../package.json')))

Pod::Spec.new do |s|
  s.name         = package['pod']
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']
  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platforms    = { :ios => "9.0", :tvos => "9.0" }
  s.source       = { :git => package['homepage'], :tag => "#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"
  s.dependency "React"
  s.dependency "AlipaySDK-iOS"
  s.dependency "SSZipArchive"

end
