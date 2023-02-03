import Head from 'next/head'
import styled from 'styled-components'
import { useDevices } from '../hooks/useDevices'
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

const $MainTitle = styled($H2)`
  margin-bottom: 32px;
`

const $Text = styled($MediumTextRegular)`
  margin-bottom: 24px;
  > span {
    color: ${(props) => props.theme.palette.pink};
  }
  > em {
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
  }
`

const $JumpLine = styled.div`
  min-height: 16px;
`

const TermsAndConditions = (): React.ReactElement => {
  const { isDesktop } = useDevices()
  return (
    <$Wrapper>
      <Head>
        <title>Terms and conditions - Shyft Network</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Terms and conditions of Shyft Dashboard" />
        <meta name="keywords" content="Terms and conditions, Shift" />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <$MainTitle className="head-title">Shyft Terms of use</$MainTitle>
      <$Text>
        The Shyft Network DAO (the “DAO”) that offers and manages an online dashboard for staking digital asset
        transactions on the blockchain (the “Dashboard”) through the website{' '}
        <span>https://dashboard.shyft.network/</span>. The DAO may collectively be referred to as “we”, “our” or “us”, ,
        and each individual or entity that helped create, support, develop or form the Shyft Network as a whole,
        including the Dashboard, shall be referred to as the “Developers”.
        <$JumpLine />
        PLEASE READ THESE TERMS OF USE (“TERMS”) CAREFULLY. THESE TERMS CONSTITUTE A LEGALLY BINDING AGREEMENT BETWEEN
        YOU AND THE DAO. THESE TERMS GOVERN YOUR ACCESS TO AND USE OF THE DASHBOARD. BY SIGNING UP FOR AN ACCOUNT, OR BY
        USING THE DASHBOARD, YOU AGREE TO BE BOUND BY THESE TERMS (INCLUDING THE LINKED DOCUMENTS REFERRED TO IN THESE
        TERMS), AS REVISED FROM TIME TO TIME. IF YOU DO NOT ACCEPT THESE TERMS, YOU MUST NOT ACCESS OR USE THE
        DASHBOARD. IF YOU ARE DISSATISFIED WITH THESE TERMS OR ANY OTHER TERMS, CONDITIONS, RULES, POLICIES, GUIDELINES
        OR PRACTICES APPLICABLE TO THE DASHBOARD, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE ACCESS TO AND USE OF
        THE DASHBOARD. YOU REPRESENT THAT YOU ARE AT LEAST THE LEGAL AGE OF MAJORITY IN YOUR JURISDICTION AND YOUR USE
        AND ACCESS OF THE DASHBOARD, INCLUDING PERFORMING ANY TRANSACTIONS ON THE DASHBOARD, DOES NOT VIOLATE APPLICABLE
        LAWS IN YOUR JURISDICTION. IF YOU ARE USING THE DASHBOARD ON BEHALF OF AN ORGANIZATION, YOU REPRESENT THAT YOU
        HAVE THE AUTHORITY TO BIND THAT ORGANIZATION TO THESE TERMS, IN WHICH CASE “YOU” OR “YOUR” WILL REFER TO SUCH
        ORGANIZATION. IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT AGREE WITH THESE TERMS, YOU MUST NOT ACCESS OR
        USE THE DASHBOARD.
        <$JumpLine />
        YOU ACKNOWLEDGE AND AGREE THAT THE DAO IS NOT A BROKER, FINANCIAL INSTITUTION OR CREDITOR AND IS PROVIDING AN
        ONLINE SERVICE THAT FACILITATES TRANSACTIONS BETWEEN A BUYER AND SELLER BUT IS NOT A PARTY TO ANY AGREEMENT FOR
        THE PURCHASE OR SALE OF DIGITAL ASSETS ON THE BLOCKCHAIN OR BETWEEN YOU AND ANY OTHER USER VIA THE DASHBOARD. WE
        ARE NOT YOUR BROKERS, INTERMEDIARIES, AGENTS, ADVISORS, CUSTODIANS AND WE DO NOT HAVE A FIDUCIARY RELATIONSHIP
        OR OBLIGATION TO YOU REGARDING ANY DECISIONS OR ACTIVITIES THAT YOU ENGAGE IN WHEN USING THE DASHBOARD. WE ARE
        NOT RESPONSIBLE FOR ANY ACTIVITIES THAT YOU ENGAGE IN WHEN USING THE DASHBOARD, AND YOU SHOULD UNDERSTAND THE
        RISKS ASSOCIATED WITH DIGITAL ASSETS, VIRTUAL CURRENCIES, BLOCKCHAIN TECHNOLOGY, SMART CONTRACTS, ELECTRONIC
        WALLETS AND THE USE OF OUR DASHBOARD AS DESCRIBED MORE FULLY BELOW.
        <$JumpLine />
        These Terms are effective on the earlier of the date (a) you click to accept these Terms, or (b) you first
        connect your wallet or otherwise use the Dashboard. You acknowledge the <span>Privacy Statement</span> located
        at [insert link] (the “Privacy Statement”), as revised from time to time, and you consent and agree to our
        collection, use and disclosure of personal information as described in the Privacy Statement.
      </$Text>
      <$H4>Connecting Your Wallet</$H4>
      <$JumpLine />
      <$Text>
        You must connect your wallet to use the Dashboard. You must provide the information reasonably requested by the
        DAO for that purpose. You are responsible for maintaining the confidentiality of your private keys or other
        non-public or confidential information about your wallet. The DAO may also allow you to register using Third
        Party Services (as defined in Section 14). You agree not to disclose your Private Key to any third party. You
        represent and warrant to the DAO that you have not misrepresented any information that you have provided in
        connection with your use of the Dashboard. You are solely responsible for all activities that occur using your
        wallet through the Dashboard. The DAO does not have access to your wallet, electronic wallet or private key and
        cannot initiate a transfer of digital assets or otherwise access your wallet.
      </$Text>
      <$H4>2. Your Privacy and Personal Information</$H4>
      <$JumpLine />
      <$Text>
        For a summary of how the DAO collects, uses and discloses personal information, please see our Privacy
        Statement.
      </$Text>
      <$H4>3. License</$H4>
      <$JumpLine />
      <$Text>
        The DAO grants you a personal, revocable, limited, non-exclusive, royalty-free, non-transferable license to
        access and use the Dashboard, and the content that the DAO, the Developers and other users make available to you
        by way of the Dashboard (“Content”), in each case subject to and conditional on your continued compliance with
        the terms and conditions of these Terms. These Terms permit you to use the Dashboard for your personal use only,
        and not for any commercial purpose other than for transactions enabled by the functionality of the Dashboard.
      </$Text>
      <$H4>3.1</$H4>
      <$JumpLine />
      <$Text>
        If you elect to sell, purchase, transfer or trade any digital assets through the use of the Dashboard, or
        receiving staking credits or rewards arising from such transactions, any transactions that you engage in will be
        conducted solely through the blockchain network governing such digital assets and you will be required to make
        or receive payments exclusively through the third-party cryptocurrency connected to your wallet. We have no
        insight into or control over these transactions, and cannot cancel, reverse or modify a transaction. You release
        the DAO, and the Developers, and each of their respective officers, directors, agents, shareholders, investors,
        subsidiaries and employees from any and all claims, demands, lawsuits, proceedings or damages (direct, indirect,
        or otherwise) of any kind and nature, known and unknown, suspected and unsuspected, disclosed and undisclosed,
        arising out of or in any way connected with any transaction that you engage through your use or access of
        Dashboard.
      </$Text>
      <$H4>3.2</$H4>
      <$JumpLine />
      <$Text>
        While the Dashboard facilitate the transactions and transfer of digital assets, the DAO is not a party to any
        transaction between users. The DAO does not control, authenticate or review any transactions, nor does the DAO
        assume any responsibility for the accuracy, reliability or completeness of any information provided by users you
        may transact with. In the event you have a dispute with any user, as the case may be, you agree to address such
        dispute directly with the user. You release the DAO and each of its members, officers, directors, agents,
        investors, subsidiaries and employees from any and all claims, demands, lawsuits, proceedings or damages
        (direct, indirect, or otherwise) of any kind and nature, known and unknown, suspected and unsuspected, disclosed
        and undisclosed, arising out of or in any way connected with any such dispute.
      </$Text>
      <$H4>4. Your content</$H4>
      <$JumpLine />
      <$H4>4.1</$H4>
      <$JumpLine />
      <$Text>
        The Dashboard may enable you to provide or upload content, including but not limited to messages, text, images,
        graphics and other information or content (collectively, &quot;Your Content&quot;) for the purposes of making
        Your Content available to the public, including other users of the Dashboard. You acknowledge and agree that you
        are solely responsible for all Your Content you submit, provide or upload and the consequences for submitting,
        providing or uploading it. Your Content must comply with all laws and these Terms of Use.
      </$Text>
      <$H4>4.2</$H4>
      <$JumpLine />
      <$Text>
        We may use Your Content in connection with providing the Dashboard to you and to other users of the Dashboard.
        We may make Your Content available to the public, including to other users of the Dashboard. You agree that by
        uploading, or otherwise providing any of Your Content, you grant to the DAO a perpetual, worldwide, irrevocable,
        non-exclusive, sublicensable, royalty-free license to use, reproduce, process, display, publish, distribute, and
        make available to the public all or any portion of such Your Content in connection with providing the Dashboard
        to you and to other users, and to incorporate Your Content in any form into the Dashboard. This license includes
        the right to host, index, cache or otherwise format Your Content. In posting Your Content, you represent to the
        DAO that you have obtained at your own expense all necessary consents, rights and permissions required to grant
        to us the license provided in this Section 6.2.
      </$Text>
      <$H4>4.3</$H4>
      <$JumpLine />
      <$Text>
        You represent and warrant that you own Your Content or have the necessary licenses, rights, consents and
        permissions to grant the license set forth herein and that its provision to the DAO and the DAO’s use of Your
        Content will not violate the copyrights, privacy rights, publicity rights, trademark rights, contract rights or
        any other intellectual property rights or other rights of any third party.
      </$Text>
      <$H4>4.4</$H4>
      <$JumpLine />
      <$Text>
        You agree that the DAO is not responsible for any violations of any third-party intellectual property rights in
        any of Your Content. You agree to pay all royalties, fees and any other monies owing to any person by reason of
        the Your Content uploaded, displayed or otherwise provided by you. You will only include in Your Content the
        personal information of another individual if you have the express permission of that individual or if you are
        otherwise entitled to do so at law.
      </$Text>
      <$H4>4.5 {isDesktop && 'Your content shall not'}</$H4>
      <$JumpLine />
      <$Text>
        a) violate any applicable law including any laws regarding the export of data or software, patent, trademark,
        trade secret, copyright, or other intellectual property, legal rights (including the rights of publicity and
        privacy of others) or contain any material that could give rise to any civil or criminal liability under
        applicable laws or that otherwise may be in conflict with these Terms.
        <br />
        <$JumpLine />
        b) in any manner violate any third party right or any agreement between you and a third party.
        <br />
        <$JumpLine />
        c) include or contain any material that is exploitive, obscene, harmful, threatening, abusive, harassing,
        hateful, defamatory, sexually explicit or pornographic, violent, inflammatory, or discriminatory based on race,
        sex, religion, nationality, disability, sexual orientation, or age or other such legally prohibited ground or be
        otherwise objectionable, such determination to be made in the DAO’s sole discretion.
        <br />
        <$JumpLine />
        d) involve, provide, or contribute any false, inaccurate, or misleading information.
        <br />
        <$JumpLine />
        e) impersonate or attempt to impersonate us, our employee(s), another user, or any other person or entity
        (including, without limitation, by using email addresses, or screen names associated with any of the foregoing
        or that are not yours).
        <br />
        <$JumpLine />
        f) transmit, or procure the sending of, any advertisements or promotions, sales, or encourage any other
        commercial activities, including, without limitation, any &quot;spam&quot;, &quot;junk mail&quot;, &quot;chain
        letter&quot;, contests, sweepstakes and other sales promotions, barter, or advertising or any other similar
        solicitation.
        <br />
        <$JumpLine />
        g) encourage any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Dashboard, or
        which, as determined by us, may harm us or users of the Dashboard or expose them to liability.
        <br />
        <$JumpLine />
        h) cause annoyance, inconvenience, or needless anxiety or be likely to upset, embarrass, or alarm any other
        person.
        <br />
        <$JumpLine />
        i) promote any illegal activity, or advocate, promote, or assist any unlawful act.
        <br />
        <$JumpLine />
        j) give the impression that they originate from or are endorsed by us or any other person or entity if this is
        not the case.
        <br />
      </$Text>
      <$H4>4.6 {isDesktop && 'We have the right, without notice to:'}</$H4>
      <$JumpLine />
      <$Text>
        a) remove or refuse to post any of Your Content for any or no reason in our sole discretion.
        <$JumpLine />
        b) at all times, take such actions with respect to any of Your Content we deem necessary or appropriate in our
        sole discretion.
        <$JumpLine />
        c) take appropriate legal action, including, without limitation, referral to law enforcement or any other
        governmental authority with respect to Your Content or your use of any of the Dashboard. Without limiting the
        foregoing, we will fully cooperate with any law enforcement authorities or court order requesting or directing
        us to disclose the identity or other information of anyone posting any materials on or through the Dashboard.
      </$Text>
      <$H4>4.7</$H4>
      <$JumpLine />
      <$Text>
        We have no obligation, nor any responsibility to any party to monitor Your Content on the Dashboard, and do not
        and cannot undertake to review material that you or other users submit. We cannot ensure prompt removal of
        objectionable material after it has been posted and we have no liability for any action or inaction regarding
        transmissions, communications, or content provided by any user or third party, subject to applicable laws.
      </$Text>
      <$Text>
        <em>Unacceptable Use.</em> You will not (a) make the Dashboard or the Content available to, or use the Dashboard
        or the Content for the benefit of, anyone other than yourself, (b) sell, resell, license, sublicense,
        distribute, make available, rent or lease the Dashboard or the Content, or include the Dashboard or the Content
        in a service bureau or outsourcing offering, (c) use the Dashboard to store or transmit infringing, libelous, or
        otherwise unlawful or tortious material, or to store or transmit material in violation of third-party rights,
        including intellectual property rights and privacy rights, (d) use the Dashboard to send spam, or to store or
        transmit any virus, Trojan horse, worm, or other software, script or code, the effect of which is to permit
        unauthorized access to, or to alter, disable, encrypt, erase, or otherwise harm, any computer, systems, software
        or data (“Malicious Code”), (e) interfere with or disrupt the integrity or performance of the Dashboard, (f)
        attempt to gain unauthorized access to the Dashboard or Content or their related systems or networks, (g) access
        or use any DAO or Developer intellectual property except as permitted under these Terms, (h) copy or make
        derivative works from all or any part of the Dashboard or the Content or any part, feature, function or user
        interface of the Dashboard, (i) frame or mirror any part of the Dashboard or the Content, or otherwise
        incorporate any portion of the Dashboard or the Content into any product or service, (j) access or use the
        Dashboard in order to build a competitive product or service or to benchmark with a non-DAO product or service,
        (k) reverse engineer the Dashboard, or any software used to provide them (to the extent such restriction is
        permitted by applicable laws), (l) access or use any part of the Content that is (expressly or implicitly) not
        intended for use by you, (m) use any non-DAO automation code in relation to the Dashboard or Content (including
        any “bot” or “spider”), (n) collect or harvest any information from the Dashboard or Content in a bulk or
        systematic way, (o) remove, alter, or obscure any proprietary notices on the Dashboard or the Content, (p)
        probe, scan, or test the vulnerability of the Dashboard or any network connected to them, or breach the security
        or authentication measures on them or on any network connected to them, (q) collect, harvest, reverse look-up,
        trace, or otherwise seek to obtain any information on any other user of or visitor to the Dashboard, (r) take
        any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Dashboard
        or any systems or networks connected to them, (s) forge headers, impersonate a person, or otherwise manipulate
        identifiers in order to disguise your identity or the origin of any message you send to the DAO or any other
        person on or through the Dashboard; (t) create user accounts by automated means or under false or fraudulent
        pretenses; (u) use, employ, operate, or create a computer program to simulate the human behaviour of a user
        (“Bots”); (v) use, employ or operate Bots or other similar forms of automation to engage in any activity or
        transaction through the use of the Dashboard; (w) acquire digital assets through inappropriate or illegal means,
        including among other things, a payment mechanism you do not have a right to use; (x) purchase, sell or
        facilitate the purchase or sale of any user’s accounts to other users or third parties for cash or
        cryptocurrency consideration outside of the Dashboard; or (y) otherwise wrongfully seize or receive any digital
        asset made available through the Dashboard.
      </$Text>
      <$Text>
        <em>Mobile Device Data Charges.</em> You are solely responsible for any data charges and similar fees associated
        with your use of the Dashboard through a mobile device.
        <$JumpLine />
        <em>Reservation of Rights.</em> The DAO and each of its licensors have and will retain all right, title and
        interest in and to the Dashboard and Content and the software and systems used to provide them (including,
        without limitation, all patent, copyright, trademark, trade secret and other intellectual property rights), and
        all copies, modifications and derivative works of any of them. You acknowledge that you are obtaining only a
        limited right to access and use the Dashboard and the Content. No rights are granted to you under these Terms
        other than as expressly set forth in these Terms. Without limitation, you have no right to use any trademarks
        owned or used by the DAO.
      </$Text>
      <$H4>10. Open sources</$H4>
      <$JumpLine />
      <$Text>
        The Dashboard may contain or be provided together with free or open-source software. Notwithstanding the
        sections titled “License” and “Reservation of Rights”, each item of free or open-source software is subject to
        its own applicable license terms which can be found in the applicable documentation or the applicable help,
        notices, about or source files as required by the terms of the applicable open-source license. Copyrights to the
        free and open-source software are held by the respective copyright holders indicated therein. To learn more
        about what free or open-source software may be included in the Dashboard, visit{' '}
        <span>https://github.com/ShyftNetwork</span>
        <$JumpLine />
        License to Use Your Feedback. You grant to the DAO and the Developers a worldwide, perpetual, irrevocable,
        royalty-free, transferable, sublicensable (through multiple tiers) license to use and incorporate into its
        services any suggestion, enhancement request, recommendation, correction or other feedback provided by you.
        <$JumpLine />
        Third Party Dashboard. The Dashboard may allow you to access and use services provided by third parties (“Third
        Party Dashboard”). You are responsible for all fees and taxes that may be charged for the use of Third Party
        Dashboard. You use any Third Party Dashboard at your own risk. The DAO makes no representations or warranties
        with respect to, nor does it guarantee or endorse, any Third Party Dashboard. The DAO does not guarantee the
        continued availability of Third Party Dashboard, and the DAO may disable a Third Party Service in its sole
        discretion. Your dealings with the provider of any Third Party Dashboard are solely between you and the
        provider. Accordingly, the DAO expressly disclaims responsibility and liability for all Third Party Dashboard,
        and you agree that the DAO shall not be responsible for any loss or damage of any sort incurred as a result of
        any such dealings or as a result of your use of Third Party Dashboard. If you have any issues with a Third Party
        Service, you must contact the provider of the Third Party Service directly.
        <$JumpLine />
        Links to Other Sites. The Dashboard or Content may provide links to other sites on the Internet for your
        convenience in locating or accessing related information, products, and services. These sites have not
        necessarily been reviewed by the DAO or any of the Developers and are maintained by third parties over which the
        DAO exercise no control. Accordingly, the DAO expressly disclaims any responsibility for the content, the
        materials, the accuracy of the information, and/or the quality of the products or services provided by,
        available through, or advertised on these linked third-party websites. Moreover, these links do not imply an
        endorsement with respect to any third party or any website or the products or services provided by any third
        party.
        <$JumpLine />
        Content, Functionality and Access. The DAO may at any time, with or without notice, without liability, and for
        any reason (a) remove any Content from the Dashboard, (b) remove any functionality from the Dashboard, (c)
        change any functionality on the Dashboard, (d) deny any person access to the Dashboard. The DAO furthermore
        reserves the right to take any action related to the Dashboard or Content that is required to comply with
        applicable law.
      </$Text>
      <$H4>Disclaimer of Warranties</$H4>
      <$JumpLine />
      <$H4>15.1</$H4>
      <$JumpLine />
      <$Text>
        THE DASHBOARD, ANY DIGITAL OR CRYPTOCURRENCY ASSETS AVAILABLE BY WAY OF THE DASHBOARD, ANY SMART CONTRACT OR
        BLOCKCHAIN APPLICATION, THE STAKING REWARD PROGRAM AND THE CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE”, AND
        MAY INCLUDE ERRORS, OMISSIONS, OR OTHER INACCURACIES. YOUR USE OF THE DASHBOARD AND THE CONTENT IS AT YOUR OWN
        RISK.
      </$Text>
      <$H4>15.2</$H4>
      <$JumpLine />
      <$Text>
        THE DAO AND THE DEVELOPERS DISCLAIM ALL WARRANTIES, REPRESENTATIONS, COVENANTS AND CONDITIONS (EXPRESS, IMPLIED
        OR STATUTORY) IN CONNECTION WITH THE DASHBOARD, ANY DIGITAL ASSETS OR OTHER CRYPTOCURRENCY ASSETS AVAILABLE BY
        WAY OF THE DASHBOARD, ANY SMART CONTRACT OR BLOCKCHAIN APPLICATION, ANY STAKING REWARD PROGRAM AND THE CONTENT,
        INCLUDING ANY WARRANTIES, REPRESENTATIONS, COVENANTS, CONDITIONS, OR OTHER TERMS OF MERCHANTABILITY, FITNESS FOR
        A PARTICULAR PURPOSE, ACCURACY, COMPLETENESS, PERFORMANCE, AND NON-INFRINGEMENT. NEITHER THE DAO NOR THE
        DEVELOPERS MAKE ANY REPRESENTATION OR WARRANTY OR ANY OTHER TERM THAT DASHBOARD AND THE CONTENT WILL OPERATE
        ERROR FREE OR IN AN UNINTERRUPTED FASHION, OR THAT THE DASHBOARD AND THE CONTENT WILL BE SECURE, OR THAT ANY
        FILES OR INFORMATION THAT YOU DOWNLOAD FROM THE DASHBOARD, OR THAT THE CONTENT, WILL BE FREE OF MALICIOUS CODE.
        THE DAO OR THE DEVELOPERS ARE NOT RESPONSIBLE FOR THE SECURITY OF ANY TRANSACTIONS OR INFORMATION TRANSMITTED TO
        OR FROM THE DASHBOARD.
      </$Text>
      <$H4>15.3</$H4>
      <$JumpLine />
      <$Text>
        THE DAO AND THE DEVELOPERS MAKE NO REPRESENTATIONS OR WARRANTIES ABOUT ANY THIRD PARTY WEBSITES OR RELATED
        CONTENT DIRECTLY OR INDIRECTLY ACCESSED THROUGH LINKS IN THE DASHBOARD OR CONTENT.{' '}
      </$Text>
      <$H4>15.4</$H4>
      <$JumpLine />
      <$Text>
        THE DAO AND THE DEVELOPERS MAKE NO REPRESENTATIONS AND WARRANTIES, EXPRESS OR IMPLIED, WRITTEN OR ORAL, MADE BY
        OR ON BEHALF OF THE DAO AND THE DEVELOPERS , IN CONNECTION WITH THE PRICE OR VALUE OF ANY DIGITAL ASSET SOLD,
        PURCHASED, TRANSFERRED OR OTHERWISE TRANSACTED BY WAY OF THE DASHBOARD, INCLUDING THAT THE PRICE OR VALUE IS
        FAIR OR ACCURATE, OR THE VALUE OR AMOUNT RECEIVED THROUGH STAKING DASHBOARD PROVIDED BY WAY OF THE DASHBOARD ON
        ANY TRANSACTION.{' '}
      </$Text>
      <$H4>15.5</$H4>
      <$JumpLine />
      <$Text>
        DIGITAL ASSETS EXIST ONLY BY VIRTUE OF OWNERSHIP RECORD MAINTAINED ON THE ASSOCIATED BLOCKCHAIN NETWORK, AND THE
        DAO MAKE NO REPRESENTATION, WARRANTY OR GUARANTEE THAT THE DAO CAN EFFECT OR OTHERWISE CONTROL THE TRANSFER OF
        TITLE OR RIGHTS IN ANY DIGITAL ASSETS.{' '}
      </$Text>
      <$H4>15.6</$H4>
      <$JumpLine />
      <$Text>
        THE DAO OR THE DEVELOPERS (AND EACH OF THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, SHAREHOLDERS, PARTNERS,
        SUPPLIERS AND AGENTS) WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS THE RESULT OF YOUR
        USE OF THE BLOCKCHAIN NETWORK, OR YOUR ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR
        CLAIMS ARISING FROM: (A) USER ERROR, SUCH AS FORGOTTEN PASSWORDS, PRIVATE KEYS OR INCORRECTLY CONSTRUED SMART
        CONTRACTS OR OTHER TRANSACTIONS; (B) SERVER FAILURE OR DATA LOSS; (C) CORRUPTED WALLET FILES; OR (D)
        UNAUTHORIZED ACCESS OR ACTIVITIES BY THIRD PARTIES, INCLUDING, BUT NOT LIMITED TO, THE USE OF VIRUSES, PHISHING,
        BRUTE-FORCING OR OTHER MEANS OF ATTACK AGAINST THE NETWORK, THE BLOCKCHAIN NETWORK, OR ANY ELECTRONIC WALLET.
        THE DAO IS NOT RESPONSIBLE OR LIABLE FOR ANY SUSTAINED LOSSES OR INJURY DUE TO VULNERABILITY OR ANY KIND OF
        FAILURE, ABNORMAL BEHAVIOR OF SOFTWARE (E.G., WALLET, SMART CONTRACT), BLOCKCHAINS OR ANY OTHER FEATURES OF THE
        DIGITAL ASSETS. THE DAO IS NOT RESPONSIBLE FOR LOSSES OR INJURY DUE TO LATE REPORTS BY DEVELOPERS OR
        REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE BLOCKCHAIN SUPPORTING THE DIGITAL ASSETS, INCLUDING
        FORKS, TECHNICAL NODE ISSUES OR ANY OTHER ISSUES HAVING LOSSES OR INJURY AS A RESULT.{' '}
      </$Text>
      <$H4>15.7</$H4>
      <$JumpLine />
      <$Text>
        YOUR SOLE AND EXCLUSIVE REMEDY FOR DISSATISFACTION WITH THE DASHBOARD AND THE CONTENT IS TO STOP USING THEM.
      </$Text>
      <$Text>
        We have no obligation, nor any responsibility to any party to monitor Your Content on the Dashboard, and do not
        and cannot undertake to review material that you or other users submit. We cannot ensure prompt removal of
        objectionable material after it has been posted and we have no liability for any action or inaction regarding
        transmissions, communications, or content provided by any user or third party, subject to applicable laws.
        <$JumpLine />
        <em>Unacceptable Use.</em> You will not (a) make the Dashboard or the Content available to, or use the Dashboard
        or the Content for the benefit of, anyone other than yourself, (b) sell, resell, license, sublicense,
        distribute, make available, rent or lease the Dashboard or the Content, or include the Dashboard or the Content
        in a service bureau or outsourcing offering, (c) use the Dashboard to store or transmit infringing, libelous, or
        otherwise unlawful or tortious material, or to store or transmit material in violation of third-party rights,
        including intellectual property rights and privacy rights, (d) use the Dashboard to send spam, or to store or
        transmit any virus, Trojan horse, worm, or other software, script or code, the effect of which is to permit
        unauthorized access to, or to alter, disable, encrypt, erase, or otherwise harm, any computer, systems, software
        or data (“Malicious Code”), (e) interfere with or disrupt the integrity or performance of the Dashboard, (f)
        attempt to gain unauthorized access to the Dashboard or Content or their related systems or networks, (g) access
        or use any DAO or Developer intellectual property except as permitted under these Terms, (h) copy or make
        derivative works from all or any part of the Dashboard or the Content or any part, feature, function or user
        interface of the Dashboard, (i) frame or mirror any part of the Dashboard or the Content, or otherwise
        incorporate any portion of the Dashboard or the Content into any product or service, (j) access or use the
        Dashboard in order to build a competitive product or service or to benchmark with a non-DAO product or service,
        (k) reverse engineer the Dashboard, or any software used to provide them (to the extent such restriction is
        permitted by applicable laws), (l) access or use any part of the Content that is (expressly or implicitly) not
        intended for use by you, (m) use any non-DAO automation code in relation to the Dashboard or Content (including
        any “bot” or “spider”), (n) collect or harvest any information from the Dashboard or Content in a bulk or
        systematic way, (o) remove, alter, or obscure any proprietary notices on the Dashboard or the Content, (p)
        probe, scan, or test the vulnerability of the Dashboard or any network connected to them, or breach the security
        or authentication measures on them or on any network connected to them, (q) collect, harvest, reverse look-up,
        trace, or otherwise seek to obtain any information on any other user of or visitor to the Dashboard, (r) take
        any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Dashboard
        or any systems or networks connected to them, (s) forge headers, impersonate a person, or otherwise manipulate
        identifiers in order to disguise your identity or the origin of any message you send to the DAO or any other
        person on or through the Dashboard; (t) create user accounts by automated means or under false or fraudulent
        pretenses; (u) use, employ, operate, or create a computer program to simulate the human behaviour of a user
        (“Bots”); (v) use, employ or operate Bots or other similar forms of automation to engage in any activity or
        transaction through the use of the Dashboard; (w) acquire digital assets through inappropriate or illegal means,
        including among other things, a payment mechanism you do not have a right to use; (x) purchase, sell or
        facilitate the purchase or sale of any user’s accounts to other users or third parties for cash or
        cryptocurrency consideration outside of the Dashboard; or (y) otherwise wrongfully seize or receive any digital
        asset made available through the Dashboard.
      </$Text>
      <$Text>
        <em>Limitation of Liability.</em> IN NO EVENT WILL THE TOTAL AGGREGATE LIABILITY OF THE DAO OR THE DEVELOPERS,
        AND EACH OF THEIR RESPECTIVE AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, SHAREHOLDERS, PARTNERS, SUPPLIERS AND
        AGENTS, AND THE PROVIDERS OF CHANNELS, THIRD PARTY DASHBOARD AND THIRD PARTY CONTENT, AND THE SUPPLIERS OF
        PRODUCTS FOR ALL CLAIMS, DAMAGES, LOSSES, LIABILITIES, COSTS AND EXPENSES (INCLUDING LEGAL FEES AND EXPENSES)
        (COLLECTIVELY “LOSSES”) TO YOU RELATED TO THE DASHBOARD, THE DIGITAL ASSETS, BLOCKCHAIN NETWORKS OR SMART
        CONTRACTS, THE CONTENT, OR THESE TERMS, EXCEED THE LESSER OF: (a) DIRECT DAMAGES SUFFERED BY YOU IN THE THREE
        (3) MONTHS PERIOD PRECEDING THE DATE THE CLAIM AROSE; OR (b) TEN THOUSAND US DOLLARS (USD 10,000).
        <$JumpLine />
        <em>No Claim for Certain Damages.</em> IN NO EVENT WILL THE DAO , OR THE DEVELOPERS AND EACH OF THEIR RESPECTIVE
        AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, SHAREHOLDERS, PARTNERS, SUPPLIERS OR AGENTS, OR THE PROVIDERS OF
        CHANNELS, THIRD PARTY DASHBOARD AND THIRD PARTY CONTENT, AND THE SUPPLIERS OF PRODUCTS BE LIABLE TO YOU FOR ANY
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, EXEMPLARY OR AGGRAVATED DAMAGES, OR FOR ANY LOSS OF
        REVENUE, SAVINGS, INCOME, BUSINESS, PROFIT, GOODWILL OR REPUTATION WHATSOEVER BASED ON ANY LEGAL THEORY
        (INCLUDING TORT OR NEGLIGENCE), AND EVEN IF ADVISED OF THE POSSIBILITY OF THOSE DAMAGES.
        <$JumpLine />
        <em>Some Disclaimers, Exclusions or Limitations May Not Apply.</em> In some circumstances, applicable law may
        not allow for limitations on certain implied warranties, or exclusions or limitations of certain damages. Solely
        to the extent that such law applies to you, some or all of the above disclaimers, exclusions or limitations may
        not apply to you.
        <$JumpLine />
        <em>Indemnity.</em> You will indemnify and hold the DAO and the Developers (and each of their respective
        affiliates, directors, shareholders, officers, employees, partners, suppliers and agents) harmless from all
        Losses arising from your use of the Dashboard, the digital assets or any blockchain network or smart contract,
        or the Content, or your breach of any of these Terms, and from all Losses resulting from any of Your Content
        that is untrue, inaccurate or incomplete.
        <$JumpLine />
        <em>Amendments.</em> The “last updated” legend above indicates when these Terms were last amended. The DAO may
        unilaterally amend all or any part of these Terms at any time by updating these Terms on the website [URL]. We
        will provide you with notice of the proposed amendments by posting an amended version of these Terms with a new
        version date. We will include a link to the previous version of the Terms beneath the new version date. The
        amendments will take effect 30 days after the date on which the amended version is posted. Prior to that date,
        the previous version of the Terms will continue to apply. If you disagree with any amendments, you may refuse
        the amendments and cease using the Dashboard and the Content within the 30-day notice period. There will be no
        cost or penalty for doing so. If you continue to access or use the Dashboard or the Content after the 30-day
        period, you thereby agree to the amended Terms. You agree to review these Terms regularly to determine your
        rights and responsibilities.
        <$JumpLine />
        <em>Governing Law &amp; Jurisdiction.</em> These Terms, and any dispute, controversy or claim arising under, out
        of, in connection with, or related to (a) the Dashboard or the Content, or (b) these Terms, or their subject
        matter, negotiation, performance, renewal, termination, interpretation, or formation, shall be governed by and
        interpreted according to the laws of Barbados, without regard to any conflicts of law rules that might apply the
        laws of any other jurisdiction. You, and the DAO and the Developers each attorn to the exclusive jurisdiction of
        the courts of Barbados in respect of any such dispute, controversy or claim, except that, notwithstanding the
        foregoing, (a) you agree that the DAO and the Developers shall be entitled to seek and be awarded an injunction
        or other appropriate equitable relief from a court of competent jurisdiction anywhere in the world restraining
        any breach, threatened or actual, of your obligations under any provision of these Terms, and (b) you agree that
        the DAO and the Developers shall be entitled to seek and be awarded an order from a court of competent
        jurisdiction anywhere in the world for the purpose of recognizing and enforcing any interim or final judgement,
        order, injunction, award or other relief granted or provided by the courts of Barbados, and you hereby waive any
        defense you might then have to the granting of such an order.
        <$JumpLine />
        <em>Injunction.</em> You acknowledge that any breach, threatened or actual, of these Terms will cause
        irreparable harm to the DAO or the Developers, such harm would not be quantifiable in monetary damages, and the
        DAO would not have an adequate remedy at law. You agree that the DAO and the Developers shall be entitled, in
        addition to other available remedies, to seek and be awarded an injunction or other appropriate equitable relief
        from a court of competent jurisdiction anywhere in the world restraining any breach, threatened or actual, of
        your obligations under any provision of these Terms, and without the necessity of showing or proving any actual
        or threatened damage or harm, notwithstanding any rule of law or equity to the contrary. You hereby waive any
        requirement that the DAO or the Developers post any bond or other security in the event any injunctive or
        equitable relief is sought by or awarded to the DAO or the Developers, as the case may be, to enforce any
        provision of these Terms.
        <$JumpLine />
        <em>Class Action Waiver.</em> Any proceedings to resolve or litigate any dispute, controversy or claim arising
        under, out of, in connection with, or related to (a) the Dashboard or the Content, or (b) these Terms, or their
        subject matter, negotiation, performance, renewal, termination, interpretation, or formation, will be conducted
        solely on an individual basis. You, or the DAO will not seek to have any such dispute heard as a class action,
        private attorney general action, or in any other proceeding in which either party acts or proposes to act in a
        representative capacity. No proceeding will be combined with another without the prior written consent of all
        parties to all affected proceedings. If this class action waiver is found to be illegal or unenforceable as to
        all or some parts of a dispute, then this section will not apply to those parts.
        <$JumpLine />
        <em>General.</em> If any provision of these Terms is unlawful, void, or unenforceable, then that provision shall
        be deemed severed from the remaining provisions and shall not affect the validity and enforceability of the
        remaining provisions. All rights and remedies of the DAO or the Developers granted or recognized in these Terms
        are cumulative, are in addition to and not in substitution for any rights or remedies at law, and may be
        exercised at any time and from time to time independently or in any combination. In these Terms (a) references
        to currency are to the lawful money of the United States, (b) “person” includes individuals, corporations,
        partnerships, joint ventures, associations, trusts, unincorporated organizations, societies and all other
        organizations and entities recognized by law, and (c) “including” (and similar variations) means including
        without limitation. These Terms represent the entire agreement between you and the DAO with respect to use of
        the Dashboard and Content, and they supersede all prior or contemporaneous terms, agreements, communications and
        proposals, whether electronic, oral, or written between you and the DAO with respect to any of the foregoing.
        Failure by the DAO to insist on strict performance of any of the terms or conditions of these Terms or any
        Additional Service Terms will not operate as a waiver by the DAO of that or any subsequent default or failure of
        performance. The Developers, and each of the DAO or a Developer’s affiliates, directors, officers, employees,
        partners, suppliers, and agents are third party beneficiaries of the sections titled “Disclaimer of Warranties”,
        “Limitation of Liability”, “No Claim for Certain Damages” and “Indemnity”. Except as otherwise set out in these
        Terms, there are no other third-party beneficiaries of these Terms. You may not assign these Terms without the
        prior written consent of the DAO. The DAO may assign these Terms without restriction. These Terms will enure to
        the benefit of and will be binding on you and the DAO and your and its respective successors and permitted
        assigns.
      </$Text>
      <$Text>
        Powered by <em>Zapper</em>
      </$Text>
    </$Wrapper>
  )
}

export default TermsAndConditions
