"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollToTop } from "@/components/utils/scroll-to-top";

export function LegalForm() {
  const legals = ["terms", "privacy", "cookies", "safeguarding"];

  const checkLegalValue = (legal: string | null) => {
    if (legal !== null) {
      if (legals.includes(legal)) {
        return legal;
      }
    }
    return "terms";
  };

  const searchParams = useSearchParams();
  const defaultValue = checkLegalValue(searchParams.get("legal"));
  console.log("defaultValue");
  console.log(defaultValue);
  return (
    <Tabs defaultValue={defaultValue} className="w-full my-12">
      <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-white-800 ">
        <TabsTrigger
          value="terms"
          className="data-[state=active]:bg-blue-light"
        >
          Terms
        </TabsTrigger>
        <TabsTrigger
          value="privacy"
          className="data-[state=active]:bg-blue-light"
        >
          Privacy
        </TabsTrigger>
        <TabsTrigger
          value="cookies"
          className="data-[state=active]:bg-blue-light"
        >
          Cookie
        </TabsTrigger>
        <TabsTrigger
          value="safeguarding"
          className="data-[state=active]:bg-blue-light"
        >
          Safeguarding
        </TabsTrigger>
      </TabsList>
      <TabsContent value="terms">
        <Card className="bg-blue-light">
          <CardHeader>
            <CardTitle className="text-xl">Terms and conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              These terms and conditions (&quot;Agreement&quot;) sets forth the
              general terms and conditions of your use of the{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.tutorseekers.co.uk"
              >
                tutorseekers.co.uk
              </a>{" "}
              website (&quot;Website&quot; or &quot;Service&quot;) and any of
              its related products and services (collectively,
              &quot;Services&quot;). This Agreement is legally binding between
              you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;) and
              Cameron and Guy Limited (&quot;Cameron and Guy Limited&quot;,
              &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). By accessing
              and using the Website and Services, you acknowledge that you have
              read, understood, and agree to be bound by the terms of this
              Agreement. If you are entering into this Agreement on behalf of a
              business or other legal entity, you represent that you have the
              authority to bind such entity to this Agreement, in which case the
              terms &quot;User&quot;, &quot;you&quot; or &quot;your&quot; shall
              refer to such entity. If you do not have such authority, or if you
              do not agree with the terms of this Agreement, you must not accept
              this Agreement and may not access and use the Website and
              Services. You acknowledge that this Agreement is a contract
              between you and Cameron and Guy Limited, even though it is
              electronic and is not physically signed by you, and it governs
              your use of the Website and Services.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Accounts and membership
            </h2>
            <p>
              If you create an account on the Website, you are responsible for
              maintaining the security of your account and you are fully
              responsible for all activities that occur under the account and
              any other actions taken in connection with it. We may, but have no
              obligation to, monitor and review new accounts before you may sign
              in and start using the Services. Providing false contact
              information of any kind may result in the termination of your
              account. You must immediately notify us of any unauthorized uses
              of your account or any other breaches of security. We will not be
              liable for any acts or omissions by you, including any damages of
              any kind incurred as a result of such acts or omissions. We may
              suspend, disable, or delete your account (or any part thereof) if
              we determine that you have violated any provision of this
              Agreement or that your conduct or content would tend to damage our
              reputation and goodwill. If we delete your account for the
              foregoing reasons, you may not re-register for our Services. We
              may block your email address and Internet protocol address to
              prevent further registration.
            </p>

            <h2 className="py-4 font-semibold text-xl">User content</h2>
            <p>
              We do not own any data, information or material (collectively,
              &quot;Content&quot;) that you submit on the Website in the course
              of using the Service. You shall have sole responsibility for the
              accuracy, quality, integrity, legality, reliability,
              appropriateness, and intellectual property ownership or right to
              use of all submitted Content. We may, but have no obligation to,
              monitor and review the Content on the Website submitted or created
              using our Services by you. You grant us permission to access,
              copy, distribute, store, transmit, reformat, display and perform
              the Content of your user account solely as required for the
              purpose of providing the Services to you. Without limiting any of
              those representations or warranties, we have the right, though not
              the obligation, to, in our own sole discretion, refuse or remove
              any Content that, in our reasonable opinion, violates any of our
              policies or is in any way harmful or objectionable. Unless
              specifically permitted by you, your use of the Website and
              Services does not grant us the license to use, reproduce, adapt,
              modify, publish or distribute the Content created by you or stored
              in your user account for commercial, marketing or any similar
              purpose.
            </p>

            <h2 className="py-4 font-semibold text-xl">Billing and payments</h2>
            <p>
              You shall pay all fees or charges to your account in accordance
              with the fees, charges, and billing terms in effect at the time a
              fee or charge is due and payable. Where Services are offered on a
              free trial basis, payment may be required after the free trial
              period ends, and not when you enter your billing details (which
              may be required prior to the commencement of the free trial
              period). If, in our judgment, your purchase constitutes a
              high-risk transaction, we will require you to provide us with a
              copy of your valid government-issued photo identification, and
              possibly a copy of a recent bank statement for the credit or debit
              card used for the purchase. We reserve the right to change
              products and product pricing at any time. We also reserve the
              right to refuse any order you place with us. We may, in our sole
              discretion, limit or cancel quantities purchased per person, per
              household or per order. These restrictions may include orders
              placed by or under the same customer account, the same credit
              card, and/or orders that use the same billing and/or shipping
              address. In the event that we make a change to or cancel an order,
              we may attempt to notify you by contacting the e-mail and/or
              billing address/phone number provided at the time the order was
              made.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Accuracy of information
            </h2>
            <p>
              Occasionally there may be information on the Website that contains
              typographical errors, inaccuracies or omissions that may relate to
              product descriptions, pricing, availability, promotions and
              offers. We reserve the right to correct any errors, inaccuracies
              or omissions, and to change or update information or cancel orders
              if any information on the Website or Services is inaccurate at any
              time without prior notice (including after you have submitted your
              order). We undertake no obligation to update, amend or clarify
              information on the Website including, without limitation, pricing
              information, except as required by law. No specified update or
              refresh date applied on the Website should be taken to indicate
              that all information on the Website or Services has been modified
              or updated.
            </p>

            <h2 className="py-4 font-semibold text-xl">Backups</h2>
            <p>
              We perform regular backups of the Website and its Content,
              however, these backups are for our own administrative purposes
              only and are in no way guaranteed. You are responsible for
              maintaining your own backups of your data. We do not provide any
              sort of compensation for lost or incomplete data in the event that
              backups do not function properly. We will do our best to ensure
              complete and accurate backups, but assume no responsibility for
              this duty.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Links to other resources
            </h2>
            <p>
              Although the Website and Services may link to other resources
              (such as websites, mobile applications, etc.), we are not,
              directly or indirectly, implying any approval, association,
              sponsorship, endorsement, or affiliation with any linked resource,
              unless specifically stated herein. We are not responsible for
              examining or evaluating, and we do not warrant the offerings of,
              any businesses or individuals or the content of their resources.
              We do not assume any responsibility or liability for the actions,
              products, services, and content of any other third parties. You
              should carefully review the legal statements and other conditions
              of use of any resource which you access through a link on the
              Website and Services. Your linking to any other off-site resources
              is at your own risk.
            </p>

            <h2 className="py-4 font-semibold text-xl">Prohibited uses</h2>
            <p>
              In addition to other terms as set forth in the Agreement, you are
              prohibited from using the Website and Services or Content: (a) for
              any unlawful purpose; (b) to solicit others to perform or
              participate in any unlawful acts; (c) to violate any
              international, federal, provincial or state regulations, rules,
              laws, or local ordinances; (d) to infringe upon or violate our
              intellectual property rights or the intellectual property rights
              of others; (e) to harass, abuse, insult, harm, defame, slander,
              disparage, intimidate, or discriminate based on gender, sexual
              orientation, religion, ethnicity, race, age, national origin, or
              disability; (f) to submit false or misleading information; (g) to
              upload or transmit viruses or any other type of malicious code
              that will or may be used in any way that will affect the
              functionality or operation of the Website and Services, third
              party products and services, or the Internet; (h) to spam, phish,
              pharm, pretext, spider, crawl, or scrape; (i) for any obscene or
              immoral purpose; or (j) to interfere with or circumvent the
              security features of the Website and Services, third party
              products and services, or the Internet. We reserve the right to
              terminate your use of the Website and Services for violating any
              of the prohibited uses.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Intellectual property rights
            </h2>
            <p>
              &quot;Intellectual Property Rights&quot; means all present and
              future rights conferred by statute, common law or equity in or in
              relation to any copyright and related rights, trademarks, designs,
              patents, inventions, goodwill and the right to sue for passing
              off, rights to inventions, rights to use, and all other
              intellectual property rights, in each case whether registered or
              unregistered and including all applications and rights to apply
              for and be granted, rights to claim priority from, such rights and
              all similar or equivalent rights or forms of protection and any
              other results of intellectual activity which subsist or will
              subsist now or in the future in any part of the world. This
              Agreement does not transfer to you any intellectual property owned
              by Cameron and Guy Limited or third parties, and all rights,
              titles, and interests in and to such property will remain (as
              between the parties) solely with Cameron and Guy Limited. All
              trademarks, service marks, graphics and logos used in connection
              with the Website and Services, are trademarks or registered
              trademarks of Cameron and Guy Limited or its licensors. Other
              trademarks, service marks, graphics and logos used in connection
              with the Website and Services may be the trademarks of other third
              parties. Your use of the Website and Services grants you no right
              or license to reproduce or otherwise use any of Cameron and Guy
              Limited or third party trademarks.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Disclaimer of warranty
            </h2>
            <p>
              You agree that such Service is provided on an &quot;as is&quot;
              and &quot;as available&quot; basis and that your use of the
              Website and Services is solely at your own risk. We expressly
              disclaim all warranties of any kind, whether express or implied,
              including but not limited to the implied warranties of
              merchantability, fitness for a particular purpose and
              non-infringement. We make no warranty that the Services will meet
              your requirements, or that the Service will be uninterrupted,
              timely, secure, or error-free; nor do we make any warranty as to
              the results that may be obtained from the use of the Service or as
              to the accuracy or reliability of any information obtained through
              the Service or that defects in the Service will be corrected. You
              understand and agree that any material and/or data downloaded or
              otherwise obtained through the use of Service is done at your own
              discretion and risk and that you will be solely responsible for
              any damage or loss of data that results from the download of such
              material and/or data. We make no warranty regarding any goods or
              services purchased or obtained through the Service or any
              transactions entered into through the Service unless stated
              otherwise. No advice or information, whether oral or written,
              obtained by you from us or through the Service shall create any
              warranty not expressly made herein.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, in no event
              will Cameron and Guy Limited, its affiliates, directors, officers,
              employees, agents, suppliers or licensors be liable to any person
              for any indirect, incidental, special, punitive, cover or
              consequential damages (including, without limitation, damages for
              lost profits, revenue, sales, goodwill, use of content, impact on
              business, business interruption, loss of anticipated savings, loss
              of business opportunity) however caused, under any theory of
              liability, including, without limitation, contract, tort,
              warranty, breach of statutory duty, negligence or otherwise, even
              if the liable party has been advised as to the possibility of such
              damages or could have foreseen such damages. To the maximum extent
              permitted by applicable law, the aggregate liability of Cameron
              and Guy Limited and its affiliates, officers, employees, agents,
              suppliers and licensors relating to the services will be limited
              to an amount greater of one dollar or any amounts actually paid in
              cash by you to Cameron and Guy Limited for the prior one month
              period prior to the first event or occurrence giving rise to such
              liability. The limitations and exclusions also apply if this
              remedy does not fully compensate you for any losses or fails of
              its essential purpose.
            </p>

            <h2 className="py-4 font-semibold text-xl">Indemnification</h2>
            <p>
              You agree to indemnify and hold Cameron and Guy Limited and its
              affiliates, directors, officers, employees, agents, suppliers and
              licensors harmless from and against any liabilities, losses,
              damages or costs, including reasonable attorneys&apos; fees,
              incurred in connection with or arising from any third party
              allegations, claims, actions, disputes, or demands asserted
              against any of them as a result of or relating to your Content,
              your use of the Website and Services or any willful misconduct on
              your part.
            </p>

            <h2 className="py-4 font-semibold text-xl">Severability</h2>
            <p>
              All rights and restrictions contained in this Agreement may be
              exercised and shall be applicable and binding only to the extent
              that they do not violate any applicable laws and are intended to
              be limited to the extent necessary so that they will not render
              this Agreement illegal, invalid or unenforceable. If any provision
              or portion of any provision of this Agreement shall be held to be
              illegal, invalid or unenforceable by a court of competent
              jurisdiction, it is the intention of the parties that the
              remaining provisions or portions thereof shall constitute their
              agreement with respect to the subject matter hereof, and all such
              remaining provisions or portions thereof shall remain in full
              force and effect.
            </p>

            <h2 className="py-4 font-semibold text-xl">Dispute resolution</h2>
            <p>
              The formation, interpretation, and performance of this Agreement
              and any disputes arising out of it shall be governed by the
              substantive and procedural laws of United Kingdom without regard
              to its rules on conflicts or choice of law and, to the extent
              applicable, the laws of United Kingdom. The exclusive jurisdiction
              and venue for actions related to the subject matter hereof shall
              be the courts located in United Kingdom, and you hereby submit to
              the personal jurisdiction of such courts. You hereby waive any
              right to a jury trial in any proceeding arising out of or related
              to this Agreement. The United Nations Convention on Contracts for
              the International Sale of Goods does not apply to this Agreement.
            </p>

            <h2 className="py-4 font-semibold text-xl">Assignment</h2>
            <p>
              You may not assign, resell, sub-license or otherwise transfer or
              delegate any of your rights or obligations hereunder, in whole or
              in part, without our prior written consent, which consent shall be
              at our own sole discretion and without obligation; any such
              assignment or transfer shall be null and void. We are free to
              assign any of its rights or obligations hereunder, in whole or in
              part, to any third party as part of the sale of all or
              substantially all of its assets or stock or as part of a merger.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Changes and amendments
            </h2>
            <p>
              We reserve the right to modify this Agreement or its terms
              relating to the Website and Services at any time, effective upon
              posting of an updated version of this Agreement on the Website.
              When we do, we will revise the updated date at the bottom of this
              page. Continued use of the Website and Services after any such
              changes shall constitute your consent to such changes.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Acceptance of these terms
            </h2>
            <p>
              You acknowledge that you have read this Agreement and agree to all
              its terms and conditions. By accessing and using the Website and
              Services you agree to be bound by this Agreement. If you do not
              agree to abide by the terms of this Agreement, you are not
              authorized to access or use the Website and Services.
            </p>

            <h2 className="py-4 font-semibold text-xl">Contacting us</h2>
            <p>
              If you would like to contact us to understand more about this
              Agreement or wish to contact us concerning any matter relating to
              it, you may do so via the{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.tutorseekers.co.uk/contact"
              >
                contact form
              </a>{" "}
              or send an email to
              s&#117;&#112;po&#114;&#116;&#64;&#116;&#117;&#116;o&#114;&#115;eeker&#115;&#46;c&#111;&#46;u&#107;
            </p>

            <p>This document was last updated on 24th February 2024</p>
          </CardContent>
          <CardFooter>
            <ScrollToTop />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="privacy">
        <Card className="bg-blue-light">
          <CardHeader>
            <CardTitle className="text-xl">Privacy policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              {" "}
              This privacy policy (&quot;Policy&quot;) describes how the
              personally identifiable information (&quot;Personal
              Information&quot;) you may provide on the{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.tutorseekers.co.uk"
              >
                tutorseekers.co.uk
              </a>{" "}
              website (&quot;Website&quot; or &quot;Service&quot;) and any of
              its related products and services (collectively,
              &quot;Services&quot;) is collected, protected and used. It also
              describes the choices available to you regarding our use of your
              Personal Information and how you can access and update this
              information. This Policy is a legally binding agreement between
              you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;) and
              Cameron and Guy Limited (&quot;Cameron and Guy Limited&quot;,
              &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). By accessing
              and using the Website and Services, you acknowledge that you have
              read, understood, and agree to be bound by the terms of this
              Agreement. This Policy does not apply to the practices of
              companies that we do not own or control, or to individuals that we
              do not employ or manage.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Automatic collection of information
            </h2>
            <p>
              Our top priority is customer data security and, as such, we
              exercise the no logs policy. We may process only minimal user
              data, only as much as it is absolutely necessary to maintain the
              Website and Services. Information collected automatically is used
              only to identify potential cases of abuse and establish
              statistical information regarding the usage and traffic of the
              Website and Services. This statistical information is not
              otherwise aggregated in such a way that would identify any
              particular user of the system.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Collection of personal information
            </h2>
            <p>
              You can access and use the Website and Services without telling us
              who you are or revealing any information by which someone could
              identify you as a specific, identifiable individual. If, however,
              you wish to use some of the features on the Website, you may be
              asked to provide certain Personal Information (for example, your
              name and e-mail address). We receive and store any information you
              knowingly provide to us when you create an account, publish
              content, make a purchase, or fill any online forms on the Website.
              When required, this information may include the following:
            </p>
            <ul className="list-disc list-inside">
              <li>Personal details such as name, country of residence, etc.</li>
              <li>Contact information such as email address, address, etc.</li>
              <li>
                Account details such as user name, unique user ID, password,
                etc.
              </li>
              <li>Proof of identity such as photocopy of a government ID.</li>
              <li>
                Payment information such as credit card details, bank details,
                etc.
              </li>
              <li>Geolocation data such as latitude and longitude.</li>
              <li>
                Any other materials you willingly submit to us such as articles,
                images, feedback, etc.
              </li>
            </ul>
            <p>
              Some of the information we collect is directly from you via the
              Website and Services. However, we may also collect Personal
              Information about you from other sources such as public databases,
              social media platforms, third-party data providers, and our joint
              marketing partners. Personal Information we collect from other
              sources may include demographic information, such as age and
              gender, device information, such as IP addresses, location, such
              as city and state, and online behavioral data, such as information
              about your use of social media websites, page view information and
              search results and links. You can choose not to provide us with
              your Personal Information, but then you may not be able to take
              advantage of some of the features on the Website. Users who are
              uncertain about what information is mandatory are welcome to
              contact us.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Use and processing of collected information
            </h2>
            <p>
              In order to make the Website and Services available to you, or to
              meet a legal obligation, we need to collect and use certain
              Personal Information. If you do not provide the information that
              we request, we may not be able to provide you with the requested
              products or services. Any of the information we collect from you
              may be used for the following purposes:
            </p>
            <ul className="list-disc list-inside">
              <li>Create and manage user accounts</li>
              <li>Fulfill and manage orders</li>
              <li>Deliver products or services</li>
              <li>Improve products and services</li>
              <li>Send administrative information</li>
              <li>Send marketing and promotional communications</li>
              <li>Respond to inquiries and offer support</li>
              <li>Request user feedback</li>
              <li>Improve user experience</li>
              <li>Post customer testimonials</li>
              <li>Deliver targeted advertising</li>
              <li>Enforce terms and conditions and policies</li>
              <li>Protect from abuse and malicious users</li>
              <li>Respond to legal requests and prevent harm</li>
              <li>Run and operate the Website and Services</li>
            </ul>
            <p>
              Processing your Personal Information depends on how you interact
              with the Website and Services, where you are located in the world
              and if one of the following applies: (i) you have given your
              consent for one or more specific purposes; this, however, does not
              apply, whenever the processing of Personal Information is subject
              to California Consumer Privacy Act or European data protection
              law; (ii) provision of information is necessary for the
              performance of an agreement with you and/or for any
              pre-contractual obligations thereof; (iii) processing is necessary
              for compliance with a legal obligation to which you are subject;
              (iv) processing is related to a task that is carried out in the
              public interest or in the exercise of official authority vested in
              us; (v) processing is necessary for the purposes of the legitimate
              interests pursued by us or by a third party.
            </p>
            <p>
              {" "}
              Note that under some legislations we may be allowed to process
              information until you object to such processing (by opting out),
              without having to rely on consent or any other of the following
              legal bases below. In any case, we will be happy to clarify the
              specific legal basis that applies to the processing, and in
              particular whether the provision of Personal Information is a
              statutory or contractual requirement, or a requirement necessary
              to enter into a contract.
            </p>

            <h2 className="py-4 font-semibold text-xl">Billing and payments</h2>
            <p>
              We use third party payment processors to assist us in processing
              your payment information securely. Such third party
              processors&apos; use of your Personal Information is governed by
              their respective privacy policies which may or may not contain
              privacy protections as protective as this Policy. We suggest that
              you review their respective privacy policies.
            </p>

            <h2 className="py-4 font-semibold text-xl">Managing information</h2>
            <p>
              You are able to delete certain Personal Information we have about
              you. The Personal Information you can delete may change as the
              Website and Services change. When you delete Personal Information,
              however, we may maintain a copy of the unrevised Personal
              Information in our records for the duration necessary to comply
              with our obligations to our affiliates and partners, and for the
              purposes described below. If you would like to delete your
              Personal Information or permanently delete your account, you can
              do so on the settings page of your account on the Website.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Disclosure of information
            </h2>
            <p>
              {" "}
              Depending on the requested Services or as necessary to complete
              any transaction or provide any service you have requested, we may
              share your information with your consent with our trusted third
              parties that work with us, any other affiliates and subsidiaries
              we rely upon to assist in the operation of the Website and
              Services available to you. We do not share Personal Information
              with unaffiliated third parties. These service providers are not
              authorized to use or disclose your information except as necessary
              to perform services on our behalf or comply with legal
              requirements. We may share your Personal Information for these
              purposes only with third parties whose privacy policies are
              consistent with ours or who agree to abide by our policies with
              respect to Personal Information. These third parties are given
              Personal Information they need only in order to perform their
              designated functions, and we do not authorize them to use or
              disclose Personal Information for their own marketing or other
              purposes.
            </p>
            <p>
              We will disclose any Personal Information we collect, use or
              receive if required or permitted by law, such as to comply with a
              subpoena, or similar legal process, and when we believe in good
              faith that disclosure is necessary to protect our rights, protect
              your safety or the safety of others, investigate fraud, or respond
              to a government request.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Retention of information
            </h2>
            <p>
              We will retain and use your Personal Information for the period
              necessary to comply with our legal obligations, resolve disputes,
              and enforce our agreements unless a longer retention period is
              required or permitted by law. We may use any aggregated data
              derived from or incorporating your Personal Information after you
              update or delete it, but not in a manner that would identify you
              personally. Once the retention period expires, Personal
              Information shall be deleted. Therefore, the right to access, the
              right to erasure, the right to rectification and the right to data
              portability cannot be enforced after the expiration of the
              retention period.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Transfer of information
            </h2>
            <p>
              Depending on your location, data transfers may involve
              transferring and storing your information in a country other than
              your own. You are entitled to learn about the legal basis of
              information transfers to a country outside the European Union or
              to any international organization governed by public international
              law or set up by two or more countries, such as the UN, and about
              the security measures taken by us to safeguard your information.
              If any such transfer takes place, you can find out more by
              checking the relevant sections of this Policy or inquire with us
              using the information provided in the contact section.
            </p>

            <h2 className="py-4 font-semibold text-xl">The rights of users</h2>
            <p>
              You may exercise certain rights regarding your information
              processed by us. In particular, you have the right to do the
              following: (i) you have the right to withdraw consent where you
              have previously given your consent to the processing of your
              information; (ii) you have the right to object to the processing
              of your information if the processing is carried out on a legal
              basis other than consent; (iii) you have the right to learn if
              information is being processed by us, obtain disclosure regarding
              certain aspects of the processing and obtain a copy of the
              information undergoing processing; (iv) you have the right to
              verify the accuracy of your information and ask for it to be
              updated or corrected; (v) you have the right, under certain
              circumstances, to restrict the processing of your information, in
              which case, we will not process your information for any purpose
              other than storing it; (vi) you have the right, under certain
              circumstances, to obtain the erasure of your Personal Information
              from us; (vii) you have the right to receive your information in a
              structured, commonly used and machine readable format and, if
              technically feasible, to have it transmitted to another controller
              without any hindrance. This provision is applicable provided that
              your information is processed by automated means and that the
              processing is based on your consent, on a contract which you are
              part of or on pre-contractual obligations thereof.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              The right to object to processing
            </h2>
            <p>
              Where Personal Information is processed for the public interest,
              in the exercise of an official authority vested in us or for the
              purposes of the legitimate interests pursued by us, you may object
              to such processing by providing a ground related to your
              particular situation to justify the objection.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Data protection rights under GDPR
            </h2>
            <p>
              If you are a resident of the European Economic Area (EEA), you
              have certain data protection rights and Cameron and Guy Limited
              aims to take reasonable steps to allow you to correct, amend,
              delete, or limit the use of your Personal Information. If you wish
              to be informed what Personal Information we hold about you and if
              you want it to be removed from our systems, please contact us. In
              certain circumstances, you have the following data protection
              rights:
            </p>
            <ul className="list-disc list-inside">
              <li>
                You have the right to request access to your Personal
                Information that we store and have the ability to access your
                Personal Information.
              </li>
              <li>
                You have the right to request that we correct any Personal
                Information you believe is inaccurate. You also have the right
                to request us to complete the Personal Information you believe
                is incomplete.
              </li>
              <li>
                You have the right to request the erase your Personal
                Information under certain conditions of this Policy.
              </li>
              <li>
                You have the right to object to our processing of your Personal
                Information.
              </li>
              <li>
                {" "}
                You have the right to seek restrictions on the processing of
                your Personal Information. When you restrict the processing of
                your Personal Information, we may store it but will not process
                it further.
              </li>
              <li>
                {" "}
                You have the right to be provided with a copy of the information
                we have on you in a structured, machine-readable and commonly
                used format.
              </li>
              <li>
                {" "}
                You also have the right to withdraw your consent at any time
                where Cameron and Guy Limited relied on your consent to process
                your Personal Information.
              </li>
            </ul>
            <p>
              You have the right to complain to a Data Protection Authority
              about our collection and use of your Personal Information. For
              more information, please contact your local data protection
              authority in the European Economic Area (EEA).
            </p>

            <h2 className="py-4 font-semibold text-xl">
              California privacy rights
            </h2>
            <p>
              In addition to the rights as explained in this Policy, California
              residents who provide Personal Information (as defined in the
              statute) to obtain products or services for personal, family, or
              household use are entitled to request and obtain from us, once a
              calendar year, information about the Personal Information we
              shared, if any, with other businesses for marketing uses. If
              applicable, this information would include the categories of
              Personal Information and the names and addresses of those
              businesses with which we shared such personal information for the
              immediately prior calendar year (e.g., requests made in the
              current year will receive information about the prior year). To
              obtain this information please contact us.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              How to exercise these rights
            </h2>
            <p>
              Any requests to exercise your rights can be directed to Cameron
              and Guy Limited through the contact details provided in this
              document. Please note that we may ask you to verify your identity
              before responding to such requests. Your request must provide
              sufficient information that allows us to verify that you are the
              person you are claiming to be or that you are the authorized
              representative of such person. You must include sufficient details
              to allow us to properly understand the request and respond to it.
              We cannot respond to your request or provide you with Personal
              Information unless we first verify your identity or authority to
              make such a request and confirm that the Personal Information
              relates to you.
            </p>

            <h2 className="py-4 font-semibold text-xl">Privacy of children</h2>
            <p>
              We recognize the need to provide further privacy protections with
              respect to Personal Information we may collect from children and
              take many special precautions to protect the privacy of children.
              We do not require any Personal Information from them at any time.
              We encourage children to consult with their parents before
              submitting any information to any online resource . We believe
              parents should be involved in the online activities of their
              children and suggest that parents do their best to provide their
              children with a safe and friendly online environment.
            </p>

            <h2 className="py-4 font-semibold text-xl">Cookies</h2>
            <p>
              The Website and Services use &quot;cookies&quot; to help
              personalize your online experience. A cookie is a text file that
              is placed on your hard disk by a web page server. Cookies cannot
              be used to run programs or deliver viruses to your computer.
              Cookies are uniquely assigned to you, and can only be read by a
              web server in the domain that issued the cookie to you.
            </p>
            <p>
              We may use cookies to collect, store, and track information for
              statistical purposes to operate the Website and Services. You have
              the ability to accept or decline cookies. Most web browsers
              automatically accept cookies, but you can usually modify your
              browser setting to decline cookies if you prefer. If you choose to
              decline cookies, you may not be able to fully experience the
              features of the Website and Services. To learn more about cookies
              and how to manage them, visit{" "}
              <a target="_blank" href="https://www.internetcookies.org">
                internetcookies.org
              </a>
            </p>

            <h2 className="py-4 font-semibold text-xl">Do Not Track signals</h2>
            <p>
              Some browsers incorporate a Do Not Track feature that signals to
              websites you visit that you do not want to have your online
              activity tracked. Tracking is not the same as using or collecting
              information in connection with a website. For these purposes,
              tracking refers to collecting personally identifiable information
              from consumers who use or visit a website or online service as
              they move across different websites over time. How browsers
              communicate the Do Not Track signal is not yet uniform. As a
              result, the Website and Services are not yet set up to interpret
              or respond to Do Not Track signals communicated by your browser.
              Even so, as described in more detail throughout this Policy, we
              limit our use and collection of your personal information.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Links to other resources
            </h2>
            <p>
              The Website and Services contain links to other resources that are
              not owned or controlled by us. Please be aware that we are not
              responsible for the privacy practices of such other resources or
              third parties. We encourage you to be aware when you leave the
              Website and Services and to read the privacy statements of each
              and every resource that may collect Personal Information.
            </p>

            <h2 className="py-4 font-semibold text-xl">Information security</h2>
            <p>
              We secure information you provide on computer servers in a
              controlled, secure environment, protected from unauthorized
              access, use, or disclosure. We maintain reasonable administrative,
              technical, and physical safeguards in an effort to protect against
              unauthorized access, use, modification, and disclosure of Personal
              Information in its control and custody. However, no data
              transmission over the Internet or wireless network can be
              guaranteed. Therefore, while we strive to protect your Personal
              Information, you acknowledge that (i) there are security and
              privacy limitations of the Internet which are beyond our control;
              (ii) the security, integrity, and privacy of any and all
              information and data exchanged between you and the Website and
              Services cannot be guaranteed; and (iii) any such information and
              data may be viewed or tampered with in transit by a third party,
              despite best efforts.
            </p>

            <h2 className="py-4 font-semibold text-xl">Data breach</h2>
            <p>
              In the event we become aware that the security of the Website and
              Services has been compromised or users Personal Information has
              been disclosed to unrelated third parties as a result of external
              activity, including, but not limited to, security attacks or
              fraud, we reserve the right to take reasonably appropriate
              measures, including, but not limited to, investigation and
              reporting, as well as notification to and cooperation with law
              enforcement authorities. In the event of a data breach, we will
              make reasonable efforts to notify affected individuals if we
              believe that there is a reasonable risk of harm to the user as a
              result of the breach or if notice is otherwise required by law.
              When we do, we will send you an email.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Changes and amendments
            </h2>
            <p>
              We reserve the right to modify this Policy or its terms relating
              to the Website and Services from time to time in our discretion
              and will notify you of any material changes to the way in which we
              treat Personal Information. When we do, we will revise the updated
              date at the bottom of this page. We may also provide notice to you
              in other ways in our discretion, such as through contact
              information you have provided. Any updated version of this Policy
              will be effective immediately upon the posting of the revised
              Policy unless otherwise specified. Your continued use of the
              Website and Services after the effective date of the revised
              Policy (or such other act specified at that time) will constitute
              your consent to those changes. However, we will not, without your
              consent, use your Personal Information in a manner materially
              different than what was stated at the time your Personal
              Information was collected.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Acceptance of this policy
            </h2>
            <p>
              You acknowledge that you have read this Policy and agree to all
              its terms and conditions. By accessing and using the Website and
              Services you agree to be bound by this Policy. If you do not agree
              to abide by the terms of this Policy, you are not authorized to
              access or use the Website and Services.
            </p>

            <h2 className="py-4 font-semibold text-xl">Contacting us</h2>
            <p>
              If you would like to contact us to understand more about this
              Policy or wish to contact us concerning any matter relating to
              individual rights and your Personal Information, you may do so via
              the{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.tutorseekers.co.uk/contact"
              >
                contact form
              </a>{" "}
              or send an email to
              s&#117;&#112;p&#111;&#114;t&#64;&#116;&#117;t&#111;&#114;s&#101;&#101;k&#101;&#114;&#115;.c&#111;&#46;&#117;k
            </p>
            <p>This document was last updated on 24th February 2024</p>
          </CardContent>
          <CardFooter>
            <ScrollToTop />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="cookies">
        <Card className="bg-blue-light">
          <CardHeader>
            <CardTitle className="text-xl">Cookie policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              This cookie policy (&quot;Policy&quot;) describes what cookies are
              and how and they&#039;re being used by the{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.tutorseekers.co.uk"
              >
                tutorseekers.co.uk
              </a>{" "}
              website (&quot;Website&quot; or &quot;Service&quot;) and any of
              its related products and services (collectively,
              &quot;Services&quot;). This Policy is a legally binding agreement
              between you (&quot;User&quot;, &quot;you&quot; or
              &quot;your&quot;) and Cameron and Guy Limited (&quot;Cameron and
              Guy Limited&quot;, &quot;we&quot;, &quot;us&quot; or
              &quot;our&quot;). You should read this Policy so you can
              understand the types of cookies we use, the information we collect
              using cookies and how that information is used. It also describes
              the choices available to you regarding accepting or declining the
              use of cookies. For further information on how we use, store and
              keep your personal data secure, see our{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.tutorseekers.co.uk/privacy"
              >
                Privacy Policy
              </a>
              .
            </p>

            <h2 className="py-4 font-semibold text-xl">What are cookies?</h2>
            <p>
              Cookies are small pieces of data stored in text files that are
              saved on your computer or other devices when websites are loaded
              in a browser. They are widely used to remember you and your
              preferences, either for a single visit (through a &quot;session
              cookie&quot;) or for multiple repeat visits (using a
              &quot;persistent cookie&quot;).
            </p>
            <p>
              Session cookies are temporary cookies that are used during the
              course of your visit to the Website, and they expire when you
              close the web browser.
            </p>
            <p>
              Persistent cookies are used to remember your preferences within
              our Website and remain on your desktop or mobile device even after
              you close your browser or restart your computer. They ensure a
              consistent and efficient experience for you while visiting the
              Website and Services.
            </p>
            <p>
              Cookies may be set by the Website (&quot;first-party
              cookies&quot;), or by third parties, such as those who serve
              content or provide advertising or analytics services on the
              Website (&quot;third party cookies&quot;). These third parties can
              recognize you when you visit our website and also when you visit
              certain other websites.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              What type of cookies do we use?
            </h2>

            <h3 className="py-4 font-semibold text-base">Necessary cookies</h3>
            <p>
              Necessary cookies allow us to offer you the best possible
              experience when accessing and navigating through our Website and
              using its features. For example, these cookies let us recognize
              that you have created an account and have logged into that account
              to access the content.
            </p>

            <h3 className="py-4 font-semibold text-base">
              Functionality cookies
            </h3>
            <p>
              Functionality cookies let us operate the Website and Services in
              accordance with the choices you make. For example, we will
              recognize your username and remember how you customized the
              Website and Services during future visits.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              What are your cookie options?
            </h2>
            <p>
              If you don&apos;t like the idea of cookies or certain types of
              cookies, you can change your browser&apos;s settings to delete
              cookies that have already been set and to not accept new cookies.
              To learn more about how to do this or to learn more about cookies,
              visit{" "}
              <a target="_blank" href="https://www.internetcookies.org">
                internetcookies.org
              </a>
            </p>
            <p>
              Please note, however, that if you delete cookies or do not accept
              them, you might not be able to use all of the features the Website
              and Services offer.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Changes and amendments
            </h2>
            <p>
              We reserve the right to modify this Policy or its terms relating
              to the Website and Services at any time, effective upon posting of
              an updated version of this Policy on the Website. When we do, we
              will revise the updated date at the bottom of this page. Continued
              use of the Website and Services after any such changes shall
              constitute your consent to such changes.
            </p>

            <h2 className="py-4 font-semibold text-xl">
              Acceptance of this policy
            </h2>
            <p>
              You acknowledge that you have read this Policy and agree to all
              its terms and conditions. By accessing and using the Website and
              Services you agree to be bound by this Policy. If you do not agree
              to abide by the terms of this Policy, you are not authorized to
              access or use the Website and Services.
            </p>

            <h2 className="py-4 font-semibold text-xl">Contacting us</h2>
            <p>
              If you would like to contact us to understand more about this
              Policy or wish to contact us concerning any matter relating to our
              use of cookies, you may do so via the{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.tutorseekers.co.uk/contact"
              >
                contact form
              </a>{" "}
              or send an email to
              &#115;u&#112;&#112;&#111;r&#116;&#64;&#116;u&#116;o&#114;&#115;eek&#101;&#114;&#115;&#46;&#99;o.&#117;k
            </p>
            <p>This document was last updated on 24th February 2024</p>
          </CardContent>
          <CardFooter>
            <ScrollToTop />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="safeguarding">
        <Card className="bg-blue-light">
          <CardHeader>
            <CardTitle className="text-xl">Safeguarding Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              This policy is intended to be read in conjunction with Tutor
              Seeker&apos;s other policies, including our Terms and Conditions.
            </p>
            <p>
              If a person is at immediate risk of harm, or of harming others,
              contact the police (999) and report this as an emergency.
            </p>
            <p>
              If you have a non-urgent safeguarding concern, please follow our
              safeguarding and child protection procedures below.
            </p>
            <h2 className="py-4 font-semibold text-xl">1.0 Policy Aims</h2>
            <p>
              The purpose of this policy is to outline Tutor Seeker&apos;s
              safeguarding and child protection responsibilities and the
              responsibilities of our service users, as well as Tutor
              Seeker&apos;s procedures if there are any issues or concerns
              around a person&apos;s safety or welfare.
            </p>
            <p>
              Tutor Seeker&apos;s aims to provide an excellent service and we
              hold the safety and wellbeing of our students, tutors and other
              users as our highest priority, both whilst using the website/app
              and during tutoring sessions.{" "}
            </p>
            <p>
              By using Tutor Seeker&apos;s services, you are agreeing to the
              terms set out within this policy. Any non-compliance with these
              terms may result in being suspended or blocked from using our
              services, now and in the future, and Tutor Seeker&apos;s decision
              is final. Tutor Seeker also reserve the right to take further
              action and inform relevant agencies if we believe it necessary.
            </p>
            <h2 className="py-4 font-semibold text-xl">
              2.0 Tutor Seeker&apos;s Responsibilities
            </h2>
            <p>We will:</p>
            <ul className="list-disc list-inside">
              <li>
                Use reasonable measures to check the identity and criminal
                record status of our tutors.
              </li>
              <li>
                Require our tutors to submit photographic evidence of their
                criminal record check e.g. DBS in England which is less than 1
                year old. This will be kept confidential.
              </li>
              <li>
                Require our tutors to submit valid photographic evidence of
                their ID e.g. photo card Driver&apos;s License / Passport. This
                will be kept confidential.
              </li>
              <li>
                Require tutors to provide the details of two referees. These
                will be kept confidential.
              </li>
              <li>
                Share the referee&apos;s responses on a tutor&apos;s profile
                (anonymised).
              </li>
              <li>
                Only allow a tutor&apos;s profile to go ‘live’ if it meets our
                minimum requirements, such as the above.
              </li>
              <li>
                Encourage students to leave reviews of their tutors, which will
                be moderated by Tutor Seeker for inappropriate content, but will
                not be amended if shared.
              </li>
              <li>
                Have the ability to monitor all contact between students and
                tutors on the website.
              </li>
              <li>
                Protect all information and data in accordance with relevant
                legislation e.g. GDPR and our Privacy Policy.
              </li>
              <li>
                Will record all online lessons and store these recordings for a
                minimum of 28 days and a maximum of 90 days. Tutor Seeker may
                review these recordings where deemed appropriate and pass
                recordings onto UK law enforcement if requested. The recordings
                remain the property of Tutor Seeker.
              </li>
              <li>
                Report any concerns of criminal activity to UK law enforcement.
              </li>
              <li>
                Follow our safeguarding procedures below if we are notified of,
                or otherwise become aware of, any safeguarding incident or
                concern.
              </li>
              <li>
                Review this policy regularly to ensure continued relevance and
                compliance.
              </li>
            </ul>
            <h2 className="py-4 font-semibold text-xl">
              3.0 Student/Parent/Guardian Responsibilities
            </h2>
            <p>
              Students/prospective students must be 18 years or older to use the
              service, unless represented by a parent or legal guardian. Where a
              parent or legal guardian (adult) is representing a student under
              18 years (child), these become joint responsibilities between the
              adult and child.{" "}
            </p>
            <p>Students/parents/guardians must:</p>
            <ul className="list-disc list-inside">
              <li>
                Confirm they are 18 years or older, and whether they are a
                student or representing a student under 18 years.
              </li>
              <li>
                Give true information in their profile and ensure their profile,
                including all details within, is correct and up-to-date.
              </li>
              <li>
                Not engage in inappropriate communications with tutors and
                report any unsolicited inappropriate communications from tutors
                via our safeguarding procedure below.
              </li>
              <li>
                Inappropriate communications include, but are not limited to,
                anything which make you feel uncomfortable or any
                discriminatory, defamatory, offensive or illegal material.
              </li>
              <li>
                Verify the tutor&apos;s ID and criminal record check e.g. DBS
                certificate at the start of the first session.
              </li>
              <li>
                Report any suspicious or inappropriate behaviour from tutors via
                our safeguarding procedure below.
              </li>
              <li>
                Not leave any student under 18 years in the home alone with a
                tutor, whether face-to-face or online.
              </li>
              <li>Ensure the tutoring environment is safe and appropriate.</li>
              <li>
                Treat tutors with respect and not engage in abusive behaviour or
                language.
              </li>
              <li>
                Report any complaints, illegal activity or safeguarding
                incidents/concerns immediately using the procedure below and
                others outlined in our Terms and Conditions.
              </li>
              <li>
                Take responsibility for your own safety by adhering to the above
                and using your own knowledge of personal safety and wellbeing.
              </li>
            </ul>
            <h2 className="py-4 font-semibold text-xl">
              4.0 Tutor Responsibilities
            </h2>
            <p>
              Tutors are not employees of Tutor Seeker and are responsible for
              their own actions.
            </p>
            <p>Tutors must:</p>
            <ul className="list-disc list-inside">
              <li>
                Give true information in their profile and ensure their profile,
                including all details within, is correct and up-to-date.
              </li>
              <li>
                Disclose any criminal convictions or cautions to Tutor Seeker at
                the time of registration, or subsequently if any are received
                after registration.
              </li>
              <li>
                Provide photographic evidence of criminal record check and ID
                document when requested.
              </li>
              <li>
                Disclose any other information which may mean they are
                unsuitable to tutor.
              </li>
              <li>
                Only contact students under 18 years if they have first made
                contact with a parent/legal guardian representing them and have
                been given permission. Tutors should be satisfied that the
                representing parent/guardian is over 18 years and able to give
                consent.
              </li>
              <li>
                Cancel lessons if they become aware that there is no parent or
                legal guardian present within the home/learning environment if a
                student is under 18 years.
              </li>
              <li>
                Not engage in inappropriate communications with
                students/parents/guardians and report any unsolicited
                inappropriate communications via our safeguarding procedure
                below.
              </li>
              <li>
                Inappropriate communications include, but are not limited to,
                anything which make you feel uncomfortable or any
                discriminatory, defamatory, offensive or illegal material.
              </li>
              <li>
                Provide photographic ID and criminal record check e.g. DBS
                certificate at the start of the first session. Tutor Seeker
                advises that you bring these along to each session.
              </li>
              <li>
                Report any suspicious or inappropriate behaviour from
                students/parents/guardians via our safeguarding procedure below.
              </li>
              <li>
                Treat students/parents/guardians with respect and not engage in
                abusive behaviour or language.
              </li>
              <li>
                Ensure that the tutoring environment does not display or emit
                any inappropriate images, language or documents.
              </li>
              <li>
                Treat students in a non-discriminative and fair way, regardless
                of their characteristics.
              </li>
              <li>
                Treat students and parents/guardians with respect and work with
                them collaboratively.
              </li>
              <li>
                Take responsibility for ensuring the safety of your work
                environment and maintain appropriate insurance policies.
              </li>
              <li>
                Keep the information about students/parents/guardians/sessions
                confidential. The exception is if there is a safeguarding
                concern or if there has been a report of illegal activity or a
                risk of an act of terrorism, in which case this should be
                reported immediately in line with the procedure below, or by
                contacting the police on 999 if it is an emergency.
              </li>
              <li>
                Report any complaints, illegal activity or safeguarding
                incidents/concerns immediately using the procedure below and
                others outlined in our Terms and Conditions.
              </li>
              <li>
                Take responsibility for your own safety by adhering to the above
                and using your own knowledge of personal safety and wellbeing.
              </li>
            </ul>
            <h2 className="py-4 font-semibold text-xl">
              5.0 Safeguarding Procedure
            </h2>
            <p>
              If a person is at immediate risk of harm, or of harming others,
              contact the police (999) and report this as an emergency.
            </p>
            This procedure outlines the steps which should be taken if you have
            a safeguarding or child protection concern or to report an incident
            which has occurred through the use of Tutor Seeker&apos;s services.
            A safeguarding concern or incident is anything which gives you
            reason to believe that a person&apos;s wellbeing or safety may be at
            risk. A child protection concern or incident is anything which gives
            you cause to believe that a child (under 18) may be at risk of harm,
            where harm is defined as ‘ill treatment or the impairment of the
            health or development of the child’ (The Children Act, 1989). Anyone
            with a concern about safeguarding or child protection has the
            responsibility to report this.
            <div className="mx-4">
              <h3 className="py-4 font-semibold text-base">
                Step 1: Write it down
              </h3>
              If a specific incident has occurred, write down exactly what
              happened and the exact date and time at which it happened. If a
              child has disclosed information to you, write down what they told
              you as accurately as you can, in their own words. If you have a
              concern, write this down with as much detail as possible with a
              date and time and log any further concerns in the same place, so
              any patterns can be seen. Sign and write the date and time at the
              end of each report.
              <h3 className="py-4 font-semibold text-base">Step 2: Report</h3>
              Incidents should always be reported immediately. Once you have
              your written record from Step 1, contact Tutor Seeker on
              safe@tutorseeker.co.uk outlining the incident or concern. You may
              subsequently be asked for your record of this (Step 1). This inbox
              will be checked [daily / during working hours]. Outside of working
              hours, if you are concerned and need advice about an under 18, you
              can contact the NSPCC on 0808 800 5000 or help@nspcc.org.uk. If
              you are under 18 and need advice or to report a concern, you can
              call Childline for free on 0800 1111. If a person is at immediate
              risk of harm, or of harming others, contact the police (999) and
              report this as an emergency. Concerns should be reported in the
              same way as incidents if you believe that there is a risk of harm
              or a risk to the wellbeing or safety to any of the parties
              involved, or if you are unsure. Where there is more than one
              concern that you have recorded/noted (Step 1) you should report
              this in the same way as above.
              <h3 className="py-4 font-semibold text-base">Step 3: Support</h3>
              You should not continue to communicate with a
              tutor/student/parent/guardian where there has been a safeguarding
              incident or concern, until this has been reported to Tutor Seeker
              and resolved. Report any unsolicited further contact to Tutor
              Seeker at the email address above. If the person involved needs
              support, you can contact the NSPCC on 0808 800 5000 or
              help@nspcc.org.uk if this is about an under 18. If you are under
              18 and need advice or to report a concern, you can call Childline
              for free on 0800 1111. For over 18s, you can contact The
              Samaritans for support on 116 123.
              <h3 className="py-4 font-semibold text-base">
                Step 4: What happens next?
              </h3>
              Tutor Seeker will take every reported incident or concern
              seriously. Depending on the nature of the incident or concern, we
              will take different actions. We may: - Suspend a tutor or user
              whilst we look into the incident or concern - Pass the information
              onto the police or other relevant agencies - Pass your personal
              information onto UK law enforcement if requested Whilst we look
              into the incident or concern, tutors and users should not contact
              each other and any booked tutoring sessions should be suspended or
              cancelled. Once we know the outcome, we will be in contact to
              inform you of what has happened and what should happen next. It is
              the responsibility of the person alerted to take some action to
              protect the student or other person. Tutor Seeker are not
              responsible for any non-compliance with the recommended procedure.
            </div>
          </CardContent>
          <CardFooter>
            <ScrollToTop />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
