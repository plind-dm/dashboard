import styled from 'styled-components'
import Head from 'next/head'
import { Devices } from '../styles/constants/devices'
import { $H2, $H4, $MediumTextRegular } from '../components/uiKit'

const $Wrapper = styled.div`
  max-width: 850px;
  margin: 64px 16px 0;
  @media ${Devices.laptop} {
    width: 100%;
    margin: 124px auto 0;
  }
`

const $Separator = styled.div`
  min-height: 24px;
`

const $JumpLine = styled.div`
  min-height: 16px;
`

const $Text = styled($MediumTextRegular)`
  margin-bottom: 32px;
  > span {
    color: ${(props) => props.theme.palette.pink};
  }
  > em {
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
  }
  > ul {
    margin-left: 16px;
  }
`

const PrivacyPolicy = (): React.ReactElement => {
  return (
    <$Wrapper>
      <Head>
        <title>Privacy policy - Shyft Network</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Privacy policy of Shyft Dashboard" />
        <meta name="keywords" content="Privacy policy, Shift" />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <$H2>Shyft Network Dao Privacy Statement</$H2>
      <$Separator />
      <$Text>
        The decentralized autonomous organization (the “DAO”) that manages the Shyft Safe, Shyft Dashboard and other
        projects related to the advancement of the Shyft Network recognizes the importance of privacy. The purpose of
        this privacy statement (“Privacy Statement”) is to inform you about our privacy practices, including how we
        collect, use and disclose your Personal Information. The DAO collectively may be referred to as “we”, “our” or
        “us”.
        <$JumpLine />
        This Privacy Statement applies to the collection, use and disclosure of personal information through our
        websites located at <span>https://safe.shyft.network</span>, <span>https://dashboard.shyft.network/</span>, or
        any of our related websites, platform, mobile application and any of the related services we provide and through
        our interactions with customers and potential customers (collectively, the “Services”).
      </$Text>
      <$H4>Privacy Statement Updates</$H4>
      <$JumpLine />
      <$Text>
        This Privacy Statement is current as of the “updated” date which appears at the top of this page. We may make
        changes to this Privacy Statement from time to time, which will become immediately effective when published in a
        revised Privacy Statement posted on our website unless otherwise noted. We may also communicate the changes
        through our services or by other means.
        <$JumpLine />
        Please review this Privacy Statement carefully. By submitting your Personal Information to us, by registering
        for or using any of the services we offer, by using the Services, or by voluntarily interacting with us, you
        consent to our collecting, using and disclosing your Personal Information as set out in this Privacy Statement,
        as revised from time to time.
      </$Text>
      <$H4>What’s in this privacy statement?</$H4>
      <$JumpLine />
      <$Text>
        This Privacy Statement covers the following topics:
        <$Separator />
        <ul>
          <li>Meaning of Personal Information</li>
          <li>Your Consent to Collection, Use and Disclosure of Personal Information</li>
          <li>Your Information and the Blockchain</li>
          <li>Personal Information We Collect</li>
          <li>How We Use Your Personal Information</li>
          <li>How We Share Your Personal Information</li>
          <li>Opting Out of Communications</li>
          <li>Retention of Personal Information</li>
          <li>Information Security</li>
          <li>Accessing and Updating Your Personal Information</li>
          <li>International Transfer and Storage of Information</li>
          <li>Third Party Websites and Services</li>
          <li>Children’s Information</li>
          <li>How to Contact Us</li>
        </ul>
      </$Text>
      <$H4>Meaning of Personal Information</$H4>
      <$JumpLine />
      <$Text>
        &#34;Personal Information&#34; means information about an identifiable individual. This information may include,
        but is not limited to, your name, mailing address and country of residence, e-mail address and telephone number,
        as well as credit card information and/or electronic wallet address to facilitate transactions on our Services
        (as detailed below).
        <$JumpLine />
        Personal Information does not include any business contact information that is solely used to communicate with
        you in relation to your employment, business or profession, such as your name, position name or title, work
        address, work telephone number, work fax number or work electronic address.
        <$JumpLine />
        Personal Information also does not include information that has been anonymized or aggregated in such a way that
        there is no serious possibility it can be used to identify an individual, whether on its own or in combination
        with other information.
      </$Text>
      <$H4>Your Consent to Collection, Use and Disclosure</$H4>
      <$JumpLine />
      <$Text>
        We collect, use and disclose your Personal Information with your consent or as permitted or required by
        applicable privacy laws. How we obtain your consent (i.e. the form we use) will depend on the circumstances, as
        well as the sensitivity of the information collected. Subject to applicable laws, your consent may be expressed
        or implied, depending on the circumstances and the sensitivity of the Personal Information in question.
        <$JumpLine />
        If you choose to provide Personal Information to us, we assume that you consent to the collection, use and
        disclosure of that Personal Information as outlined in this Privacy Statement.
        <$JumpLine />
        If you wish to withdraw your consent to our collection, use or disclosure of your Personal Information, please
        contact us using the contact information in the “How to Contact Us” section below. However, before we implement
        the withdrawal of consent, we may require proof of your identity. In some cases, withdrawal of your consent may
        mean that we will no longer be able to provide certain products or services.
        <$JumpLine />
        If you provide Personal Information about another individual to us, it is your responsibility to obtain the
        consent of that individual to enable us to collect, use and disclose his or her information as described in this
        Privacy Statement.
      </$Text>
      <$H4>Your Information and the Blockchain</$H4>
      <$JumpLine />
      <$Text>
        Blockchain technology, also known as distributed ledger technology (or simply ‘DLT’), is at the core of our
        business. Blockchains are decentralized and made up of digitally recorded data in a chain of packages called
        ‘blocks’. The manner in which these blocks are linked is chronological, meaning that the data is very difficult
        to alter once recorded. Since the ledger may be distributed all over the world (across several ‘nodes’ which
        usually replicate the ledger) this means there is no single person making decisions or otherwise administering
        the system (such as an operator of a cloud computing system), and that there is no centralized place where it is
        located either.
        <$JumpLine />
        Accordingly, by design, a blockchain’s records cannot be changed or deleted and is said to be ‘immutable’. This
        may affect your ability to exercise your rights such as your right to erasure (‘right to be forgotten’), or your
        rights to object or restrict processing, of your Personal Information. Data on the blockchain cannot be erased
        and cannot be changed. Although smart contracts may be used to revoke certain access rights, and some content
        may be made invisible to others, it is not deleted.
        <$JumpLine />
        In certain circumstances, it will be necessary to write certain Personal Information, such as your wallet
        address, onto the blockchain; this is done through a smart contract and requires you to execute such
        transactions using your wallet’s private key.
        <$JumpLine />
        In most cases ultimate decisions to (i) transact on the blockchain using your wallet address, as well as (ii)
        share the public key relating to your wallet address with anyone (including us) rests with you.
        <$JumpLine />
        IF YOU WANT TO ENSURE YOUR PRIVACY RIGHTS ARE NOT AFFECTED IN ANY WAY, YOU SHOULD NOT TRANSACT ON BLOCKCHAINS AS
        CERTAIN RIGHTS MAY NOT BE FULLY AVAILABLE OR EXERCISABLE BY YOU OR US DUE TO THE TECHNOLOGICAL INFRASTRUCTURE OF
        THE BLOCKCHAIN. IN PARTICULAR THE BLOCKCHAIN IS AVAILABLE TO THE PUBLIC AND ANY PERSONAL INFORMATION SHARED ON
        THE BLOCKCHAIN WILL BECOME PUBLICLY AVAILABLE
      </$Text>
      <$H4>Personal Information We Collect </$H4>
      <$JumpLine />
      <$Text>
        The Personal Information we collect is generally in one or more of the following categories.
        <$JumpLine />
        <em>Registration.</em> When you register to use the Services or connect your electronic wallet to our network to
        use the Services, we may collect information from you or from your use of the Services that is stored on the
        blockchain, including your smart contract address of your wallet, addresses of externally owned accounts,
        transactions made using your connected wallet through our Services, and your token balance. We may also
        automatically collect usage data that is identifiable with you when you use our products and services.
        <$JumpLine />
        <em>Website.</em> For individuals who visit our website, we may collect information from you or from your
        activities on the site (where permissible under applicable laws).
        <$JumpLine />
        <ul>
          <li>
            Like most websites and other Internet services, we may collect certain technical and device information
            about your use of our website. Such information may include your Internet protocol address, information
            about your device, browser and operating system, and the date and time of your visit, as well as the region
            or general location where your device is accessing the internet, and other information about the usage of
            our website, including a history of the pages you view. This is typically done to recognize your device, the
            pages of our website that you visit, the time and date of your visit, the time spent on those pages and
            other statistics to enable us in providing better user experience to you in your future visits to this
            website.
          </li>
          <$JumpLine />
          <li>
            We may also use “cookies” or enlist third party services which use cookies to track your preferences and
            activities on our website. Cookies are small data files transferred to your computer’s hard-drive by a
            website. They keep a record of your preferences, making your subsequent visits to the site more efficient.
            Cookies may store a variety of information, including the number of times that you access a site, your
            language preferences and the number of times that you view a particular page or other item on the site. The
            use of cookies is a common practice adopted by most major sites to better serve their users. Most browsers
            are designed to accept cookies, but they can be modified to block cookies. See your browser’s help files for
            more information. You should note, however, that without cookies some of our website’s functions may not be
            available.
          </li>
          <$JumpLine />
          <li>
            If you enter information in the “Contact Us” section, we collect your name, email address, company you
            represent and details of your inquiry to enable us to respond to a general/business inquiry made by you on
            behalf of your company.
          </li>
        </ul>
        <$JumpLine />
        <em>Log Data.</em> We may keep logs of all transactions performed through the use of the Services, where we
        collect your smart contract address of the safe address, the Internet protocol address and the transaction
        ID/hash.
        <$JumpLine />
        <em>Other Interactions.</em> For individuals who otherwise interact with us, whether in person, by phone or
        e-mail, through social media or otherwise, including individuals who might be interested in acquiring our
        products or services, who sign-up to receive newsletters or other communications, or who respond to surveys and
        questionnaires, we may collect information that you provide to us during these interactions (where permissible
        under applicable law). This information may include your name, e-mail address and other contact information,
        phone type, occupation and range of managed funds.
        <$JumpLine />
        <em>Information Collected from Third-Party Companies.</em> We may receive Personal Information or anonymous data
        about you from companies that offer their products and/or services for use in conjunction with our products and
        services or whose products and/or services may be linked with ours.
        <$JumpLine />
        <ul>
          <li>
            For example, third-party wallet providers provide us with your blockchain address and certain other
            information you choose to share with those wallets providers in order to facilitate merchandise purchases on
            the Services. We may add this to the data we have already collected from or about you through other means
            set out in this section.
          </li>
          <$JumpLine />
          <li>
            We may also obtain Personal Information from third parties related to our know-your-client and regulatory
            obligations, including those related to your legal name, address, credit history, status on any sanctions’
            lists maintained by public authorities and other relevant data related to anti-money laundering and
            anti-terrorist financing regulations. In some cases, we may process additional data about you to assess risk
            and ensure the Services is not used fraudulently or for other illicit activities.
          </li>
        </ul>
      </$Text>
      <$H4>How We Use Your Personal Information</$H4>
      <$JumpLine />
      <$Text>
        We may use your Personal Information for purposes such as:
        <$Separator />
        <ul>
          <li>
            providing you with our products and services and supporting your use of our products and services and the
            Services;
          </li>
          <li>contacting you relating to our products and services;</li>
          <li>
            identifying and addressing potential or actual security incidents and to protect against malicious,
            deceptive, fraudulent or illegal activity on the Services;
          </li>
          <li>
            monitoring the usage of our products and services to support their proper functioning and further
            improvement;
          </li>
          <li>analyzing the needs and activities of our customers to help us better serve them;</li>
          <li>responding to inquiries and other requests;</li>
          <li>collecting opinions and comments about our products and services;</li>
          <li>investigating legal claims; and</li>
          <li>for other purposes to which you may otherwise consent from time to time.</li>
        </ul>
        <$JumpLine />
        We may use your Personal Information for purposes for which we have obtained your consent, and for such other
        purposes as may be permitted or required by applicable Barbadian privacy laws.
        <$Separator />
        We do not use the information we collect to advertise third party products and services or targeted advertising
        of Company products and services across third party websites or service offerings.
      </$Text>
      <$H4>How We Share Your Personal Information</$H4>
      <$JumpLine />
      <$Text>
        We rely on third party services providers to perform a variety of services on our behalf, such as electronic
        wallet providers, identification and creditworthiness verification services, Ethereum blockchain network
        services and applications, telephone, messaging and technical support providers, hosting, data storage and
        processing service providers, and research and analytics providers.
        <$Separator />
        If we provide your information to service providers, then we require that the service providers keep your
        Personal Information secure, and only handle it for limited purposes for which it is provided. We do not
        authorize the service providers to disclose your Personal Information to unauthorized parties or to use your
        Personal Information for their direct marketing purposes.
        <$Separator />
        If you would like more information about our service providers, please contact us using the contact information
        in the “How to Contact Us” section below.
        <$Separator />
        Additionally, we may use and disclose your information when we believe such use or disclosure is permitted,
        necessary or appropriate: (a) under applicable law, including laws outside your country of residence; (b) to
        comply with legal process; (c) to respond to requests from public and government authorities, including public
        and government authorities outside your country of residence; (d) to enforce the terms of the agreements for our
        products and services; (e) to protect our rights, operations or property; (f) to allow us to pursue available
        remedies or limit the damages that we may sustain. In addition, we may transfer your Personal Information and
        other information to a third party in the event of any reorganization, merger, sale, joint venture, assignment,
        transfer or other disposition of all or any portion of our business, brands, affiliates, subsidiaries or other
        assets.
        <$Separator />
        If we otherwise intend to disclose your Personal Information to a third party, we will identify that third party
        and the purpose for the disclosure, and obtain your consent.
      </$Text>
      <$H4>Opting Out of Communications</$H4>
      <$JumpLine />
      <$Text>
        If you no longer want to receive marketing-related e-mails from us, you may opt-out of receiving
        marketing-related e-mails by clicking the “unsubscribe” link at the bottom of any e-mail you receive from us.
        You may also opt-out by contacting us directly using the contact information in the “How to Contact Us” section
        below.
        <$Separator />
        We will endeavour to respond to your opt-out request promptly, but we ask that you please allow us a reasonable
        time to process your request. Please note that if you opt-out from receiving marketing-related e-mails, we may
        still need to send you communications about your use of our products or services, or other matters.
      </$Text>
      <$H4>Retention of Personal Information</$H4>
      <$JumpLine />
      <$Text>
        We will use, disclose or retain your Personal Information only for as long as necessary to fulfill the purposes
        for which that Personal Information was collected and as permitted or required by Barbadianprivacy laws.
      </$Text>
      <$H4>Information Security</$H4>
      <$JumpLine />
      <$Text>
        The Dashboard and Shyft Safe incorporate security measures with a view to protecting information from
        unauthorized access, disclosure, copying, use or modification.
        <$Separator />
        Despite the measures outlined above, no method of information transmission or information storage is 100% secure
        or error-free, so we unfortunately cannot guarantee absolute security. A breach of security safeguards can
        result in such risks as phishing and identity theft. In such cases, we act promptly to mitigate the risks and to
        inform you where there is a real risk of significant harm, or as otherwise required by law.
        <$Separator />
        If you have reason to believe that your interaction with us is no longer secure (for example, if you feel that
        the security of any information that you provided to us has been compromised), please contact us immediately
        using the contact information in the “How to Contact Us” section below.
      </$Text>
      <$H4>Accessing and Updating Your Personal Information</$H4>
      <$JumpLine />
      <$Text>
        We expect you, from time to time, to supply us with updates to your Personal Information you provide us, when
        required. We will not routinely update your Personal Information, unless such a process is necessary.
        <$Separator />
        You may make a written request to review any Personal Information about you that we have collected, used or
        disclosed, and we will provide you with any such Personal Information to the extent required by applicable laws.
        You may also challenge the accuracy or completeness of your Personal Information in our records. If you
        successfully demonstrate that your Personal Information in our records is inaccurate or incomplete, we will
        amend the Personal Information as required.
        <$Separator />
        We may require that you provide sufficient identification to fulfill your request to access or correct your
        Personal Information. Any such identifying information will be used only for this purpose.
      </$Text>
      <$H4>International Transfer and Storage of Information</$H4>
      <$JumpLine />
      <$Text>
        We do not store any Personal Information you provide to us directly, as all information related to your use of
        the Services is stored on the blockchain.
        <$Separator />
        Other jurisdictions may have different data protection rules than Barbados. While your Personal Information is
        outside of Barbados, it is subject to the laws of the country in which it is located. Those laws may require
        disclosure of your Personal Information to authorities in that country. When we engage in such transfers
        personal data across any international border, we use a variety of legal mechanisms, including contracts, to
        help ensure your rights and protections travel with your data.
      </$Text>
      <$H4>Third Party Websites and Services</$H4>
      <$JumpLine />
      <$Text>
        This Privacy Statement does not extend to any websites or products or services provided by third parties. We do
        not assume responsibility for the privacy practices of such third parties, and we encourage you to review all
        third party privacy policies prior to using third party websites or products or services.
        <$Separator />
        For example, to make transactions, you may use a third-party wallet which allows you to engage in transactions
        on the blockchain. Your interactions with any third-party wallet provider are governed by the applicable terms
        of service and privacy policy of that third party.
      </$Text>
      <$H4>Children’s Information</$H4>
      <$JumpLine />
      <$Text>
        Our products and services are not intended for anyone under the age of majority in your corresponding
        jurisdiction, and at the least no children under the age of 16, and we do not knowingly collect Personal
        Information from children under the age of 16. Children under the age of 16 should not use our products and
        services and should not provide us with their Personal Information.
      </$Text>
      <$H4>How to Contact Us</$H4>
      <$JumpLine />
      <$Text>
        All comments, questions, concerns or complaints regarding your Personal Information or our privacy practices
        should be sent through our Discord Channel at <span>https://discord.com/invite/shyftnetworks</span>
      </$Text>
      <$Text>
        Powered by <em>Zapper</em>
      </$Text>
    </$Wrapper>
  )
}

export default PrivacyPolicy
