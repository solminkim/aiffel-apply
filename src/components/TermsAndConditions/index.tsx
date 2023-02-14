import styled from '@emotion/styled';
import AnimationContainer from '../Animate';
import { motion } from 'framer-motion';

interface TermsContainerProps
  extends React.DetailsHTMLAttributes<HTMLDivElement> {}
export const TermsContainer: React.FC<TermsContainerProps> = (props) => {
  return <TermsContainerDiv {...props}>{props.children}</TermsContainerDiv>;
};

const TermsContainerDiv = styled.div`
  & {
    text-align: center;
    font-size: 12px;
    padding: 16px;
    border-radius: 5px;
    th {
      background-color: #e5e5e5;
    }
    tr,
    td {
      border: 1px solid #e5e5e5;
    }
  }
`;

// 요구하는 div spec 차이 있을 가능성 커서 따로 나눔
interface TermsProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}
export const PersonalTerms: React.FC<TermsProps> = (props) => {
  return (
    <TermsContainer {...props} className={props.className}>
      <table>
        <thead>
          <tr>
            <th className={'w-[15%]'}>항목</th>
            <th>수집 및 이용목적</th>
            <th className={'w-[15%]'}>보유기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>성명, 생년월일, 전화번호, 이메일 등과 기재 내용 일체</td>
            <td>
              수집된 개인정보를 교육생(그루) 모집 및 안내, 친구 추천 캠페인의
              경품 전달, 모두의 연구소 프로그램 안내 목적으로 활용하며, 목적
              외의 용도로는 사용하지 않습니다.
            </td>
            <td>1년 보관</td>
          </tr>
        </tbody>
      </table>
      <div className={'text-left text-[10px]'}>
        <div>
          * 귀하의 개인 정보는 수집, 이용 및 제공 목적이 달성된 경우
          [개인정보보호법] 제 21조에 따라 처리합니다.
        </div>
        <div>
          * 귀하는 위의 개인정보 수집 및 이용에 대한 동의를 거부할 권리가
          있습니다. 그러나 동의를 거부할 경우 제공되는 서비스에 제한이 있을 수
          있습니다.
        </div>
      </div>
    </TermsContainer>
  );
};
export const ThirdPartyTerms: React.FC<TermsProps> = (props) => {
  return (
    <TermsContainer {...props} className={props.className}>
      <table>
        <thead>
          <tr>
            <th className={'w-[15%]'}>항목</th>
            <th>수집 및 이용목적</th>
            <th className={'w-[15%]'}>보유기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>성명, 생년월일, 전화번호, 이메일 등과 기재 내용 일체</td>
            <td>
              수집된 개인정보를 교육생(그루) 모집 및 안내, 친구 추천 캠페인의
              경품 전달, 모두의 연구소 프로그램 안내 목적으로 활용하며, 목적
              외의 용도로는 사용하지 않습니다.
            </td>
            <td>1년 보관</td>
          </tr>
        </tbody>
      </table>
      <div className={'text-left text-[10px]'}>
        <div>
          * 귀하의 개인 정보는 수집, 이용 및 제공 목적이 달성된 경우
          [개인정보보호법] 제 21조에 따라 처리합니다.
        </div>
        <div>
          * 귀하는 위의 개인정보 수집 및 이용에 대한 동의를 거부할 권리가
          있습니다. 그러나 동의를 거부할 경우 제공되는 서비스에 제한이 있을 수
          있습니다.
        </div>
      </div>
    </TermsContainer>
  );
};
export const MarketingTerms: React.FC<TermsProps> = (props) => {
  return (
    <TermsContainer {...props} className={props.className}>
      <div className='text-left text-[10px]'>
        모두의연구소에서 제공하는 이벤트 및 서비스 (제휴서비스) 안내 등 광고성
        정보를 받으시려면 마케팅 이용에 동의하여 주시기 바랍니다.
      </div>
      <table>
        <thead>
          <tr>
            <th className={'w-[30%]'}>개인정보 수집 항목</th>
            <th>개인정보 수집 이용 목적</th>
            <th className={'w-[30%]'}>보유 및 이용기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이름, 휴대폰번호, 이메일 주소</td>
            <td>
              <div>-서비스 관련 정보전송</div>
              <div>-이벤트 운영 및 광고성 정보 전송</div>
            </td>
            <td>수집일로부터 1년</td>
          </tr>
        </tbody>
      </table>
      <div className={'text-left text-[10px]'}>
        * 동의를 거부할 권리가 있으며, 마케팅 동의 여부와 관계없이 지원신청을
        하실 수 있습니다. 다만 동의 거부시, 상기목적에 명시된 안내는 받으실 수
        없습니다.
      </div>
    </TermsContainer>
  );
};
