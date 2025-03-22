'use client';

// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {useState} from 'react';
import PochaButton from '../components/shared/PochaButton';
import {View, Text, StyleSheet} from 'react-native';
// import TipModal from "@/features/pocha/components/pay/TipModal";

export default function PaySuccessPage() {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();

  //   // extract tip-success from searchParams
  //   const tipCompleted = searchParams.get('tip_completed');
  //   const pochaID = searchParams.get('pochaid');
  //   const amount = searchParams.get('amount');

  //   // [WIP] tip-related states
  //   const [showTipModal, setShowTipModal] = useState(true);
  //   const [paymentMethodId, setPaymentMethodId] = useState<string>();
  //   const [customerName, setCustomerName] = useState<string>();
  //   const [customerEmail, setCustomerEmail] = useState<string>();
  //   const [customerID, setCustomerID] = useState<string>();

  //   useEffect(() => {
  //     if (tipCompleted) {
  //       setShowTipModal(false);
  //     }
  //   }, [tipCompleted]);

  //   // decode stripe token to process tip payment
  //   useEffect(() => {
  //     const storedPaymentMethodId = localStorage.getItem('paymentMethodId');
  //     const storedCustomerName = localStorage.getItem('customerName');
  //     const storedCustomerEmail = localStorage.getItem('customerEmail');
  //     const storedCustomerID = localStorage.getItem('customerID');

  //     if (storedPaymentMethodId && storedCustomerName && storedCustomerEmail) {
  //       setPaymentMethodId(storedPaymentMethodId);
  //       setCustomerName(storedCustomerName);
  //       setCustomerEmail(storedCustomerEmail);
  //       setCustomerID(storedCustomerID);
  //     } else {
  //       if (!showTipModal) {
  //         return;
  //       } else {
  //         router.replace('/pocha');
  //         return;
  //       }
  //     }
  //   }, [router, showTipModal]);

  //   useEffect(() => {
  //     if (tipCompleted) {
  //       setShowTipModal(false);
  //     }
  //   }, [tipCompleted]);

  //   // decode stripe token to process tip payment
  //   useEffect(() => {
  //     const storedPaymentMethodId = localStorage.getItem('paymentMethodId');
  //     const storedCustomerName = localStorage.getItem('customerName');
  //     const storedCustomerEmail = localStorage.getItem('customerEmail');
  //     const storedCustomerID = localStorage.getItem('customerID');

  //     if (storedPaymentMethodId && storedCustomerName && storedCustomerEmail) {
  //       setPaymentMethodId(storedPaymentMethodId);
  //       setCustomerName(storedCustomerName);
  //       setCustomerEmail(storedCustomerEmail);
  //       setCustomerID(storedCustomerID);
  //     } else {
  //       if (!showTipModal) {
  //         return;
  //       } else {
  //         router.replace('/pocha');
  //         return;
  //       }
  //     }
  //   }, [router, showTipModal]);

  //   useEffect(() => {
  //     // Add a new entry to prevent direct back navigation
  //     window.history.pushState({from: 'pay-success'}, '', window.location.href);

  //     // Handle the popstate (back/forward button) event
  //     const handlePopState = () => {
  //       // Navigate to /pocha instead of going back
  //       router.replace('/pocha');
  //     };

  //     window.addEventListener('popstate', handlePopState);

  //     // Cleanup listener on component unmount
  //     return () => {
  //       window.removeEventListener('popstate', handlePopState);
  //     };
  //   }, [router]);

  //   const directToMenuList = () => {
  //     setTimeout(() => {
  //       router.push('/pocha');
  //     }, 150);
  //   };

  //   const directToOrders = () => {
  //     setTimeout(() => {
  //       router.push('/pocha?tab=orders');
  //     }, 150);
  //   };

  //   if (!tipCompleted && (!pochaID || !amount)) {
  //     window.location.href = '/pocha';
  //   }

  return (
    <View style={styles.container}>
      {/* {showTipModal && paymentMethodId && (
        <TipModal
          totalPrice={parseFloat(amount)}
          paymentMethodId={paymentMethodId}
          customerName={customerName}
          customerEmail={customerEmail}
          customerID={customerID}
          onClose={() => setShowTipModal(false)}
        />
      )} */}
      <Text style={styles.text}>결제가 완료되었습니다</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/all_purpose/check_circle.png')}
          style={{width: 192, height: 192}}
        />
      </View>
      {/* {!showTipModal && (
        <Text style={styles.tipText}>
          팁을 주셔서 감사합니다! Thank you for the tip!
        </Text>
      )} */}

      <View style={styles.buttonContainer}>
        <PochaButton
          label="주문 내역 보기"
          // onClick={directToOrders}
          widthPercentage={75}
        />
        <PochaButton
          label="홈으로 돌아가기"
          // onClick={directToMenuList}
          widthPercentage={75}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontFamily: 'Sejonghospital-Bold',
  },
  imageContainer: {
    position: 'relative',
    width: 192, // 12rem * 16px
    height: 192, // 12rem * 16px
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    zIndex: 10,
    marginBottom: 16,
  },
  // 팁 주셔서 감사합니다
  tipText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16, // If not supported, use marginBottom on children instead
    width: '100%',
  },
});
