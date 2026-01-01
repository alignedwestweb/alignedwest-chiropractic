import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Shield, 
  Lock, 
  FileText, 
  Eye, 
  UserCheck, 
  AlertTriangle,
  Download,
  Phone
} from 'lucide-react'

export default function HipaaCompliance() {
  return (
    <section className="relative py-20 bg-white" style={{ zIndex: 20 }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary">Privacy & Security</Badge>
          <h2 className="text-3xl lg:text-4xl mb-6 text-gray-900">
            HIPAA Compliance &amp; Privacy Policy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your health information is protected by federal law. Learn about your rights 
            and how we safeguard your personal health information.
          </p>
        </div>

        {/* HIPAA Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              HIPAA Privacy Notice
            </CardTitle>
            <CardDescription>
              Health Insurance Portability and Accountability Act - Your Rights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                Your Health Information is Protected
              </h4>
              <p className="text-gray-700 leading-relaxed">
                This notice describes how medical information about you may be used and disclosed 
                and how you can get access to this information. Please review it carefully. 
                We are required by law to maintain the privacy and security of your health information.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Your Rights
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Request restrictions on uses and disclosures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Request confidential communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Inspect and copy your health records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Request amendments to your records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Receive an accounting of disclosures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>File a complaint</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  How We Use Your Information
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Treatment and care coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Payment and billing purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Healthcare operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Appointment reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Public health activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Required by law</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Privacy Policy
            </CardTitle>
            <CardDescription>
              How we collect, use, and protect your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="mb-3">Information We Collect</h4>
              <p className="text-gray-600 mb-4">
                We collect health information about you from the following sources:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>Information you provide on forms and during appointments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>Information from examinations and diagnostic tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>Information from other healthcare providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>Insurance and billing information</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className="mb-3">How We Protect Your Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="mb-2">Physical Safeguards</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Locked filing cabinets</li>
                    <li>• Restricted access areas</li>
                    <li>• Secure disposal methods</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="mb-2">Technical Safeguards</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Encrypted data transmission</li>
                    <li>• Secure servers and firewalls</li>
                    <li>• Regular security updates</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="mb-2">Administrative Safeguards</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Staff training programs</li>
                    <li>• Access controls</li>
                    <li>• Regular policy reviews</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="mb-2">Organizational Safeguards</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Business associate agreements</li>
                    <li>• Breach notification procedures</li>
                    <li>• Compliance monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact and Complaints */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Privacy Officer Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                If you have questions about this notice or concerns about your privacy rights:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Privacy Officer:</span>
                  <br />
                  <span>Dr. Sarah Johnson</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <br />
                  <span>(555) 123-4567 ext. 101</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <br />
                  <span>privacy@spinewellchiro.com</span>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <br />
                  <span>123 Wellness St<br />Health City, HC 12345</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                File a Complaint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                You may file a complaint with us or with the Secretary of Health and Human Services:
              </p>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm">With Our Office:</h5>
                  <p className="text-xs text-gray-600">
                    Submit complaints in writing to our Privacy Officer using the contact information above.
                  </p>
                </div>
                <div>
                  <h5 className="text-sm">With HHS:</h5>
                  <p className="text-xs text-gray-600">
                    Office for Civil Rights<br />
                    U.S. Department of Health and Human Services<br />
                    200 Independence Avenue, S.W.<br />
                    Washington, D.C. 20201
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download and Actions */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button variant="outlined">
              <Download className="mr-2 h-4 w-4" />
              Download Full HIPAA Notice
            </Button>
            <Button variant="outlined">
              <FileText className="mr-2 h-4 w-4" />
              Download Privacy Policy
            </Button>
          </div>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            This notice is effective as of January 1, 2024. We reserve the right to change this notice 
            and make the new notice apply to health information we already have as well as any information 
            we receive in the future.
          </p>
        </div>
      </div>
    </section>
  )
}