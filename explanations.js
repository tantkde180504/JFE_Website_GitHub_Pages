/**
 * JFE Explanations - Giai thich dap an
 *
 * Format: { [questionId]: "Giai thich..." }
 *
 * Cach them:
 *   - Tim ID cau hoi (hien thi o goc "ID xxx")
 *   - Them dong: [ID]: "Giai thich cua ban",
 *
 * Ho tro HTML co ban: <b>, <i>, <br>, <code>
 */
window.JFE_EXPLANATIONS = {

  // === Chapter 01: Toan hoc & he dem ===

  777: `<b>Dinh ly Bayes:</b><br>
Goi A = san pham tu day chuyen A, D = san pham loi.<br>
P(A)=0.6, P(B)=0.4 | P(D|A)=0.02, P(D|B)=0.01<br>
P(D) = 0.6x0.02 + 0.4x0.01 = 0.016<br>
P(A|D) = (0.02x0.6)/0.016 = <b>75%</b>`,

  476: `<b>Tran so (overflow) voi 4-bit two's complement:</b><br>
Pham vi: -8 den +7.<br>
A=0111(+7), B=1010(-6): 0111-1010 = 0111+0110 = 1101 (-3) thay vi +13.<br>
Tran xay ra khi 2 so cung dau nhung ket qua khac dau.`,

  701: `<b>NAND voi 11000011:</b><br>
NAND(x,y) = NOT(x AND y)<br>
Bit 0 cua mask: NAND(x,0)=NOT(0)=1 => set thanh 1<br>
Bit 1 cua mask: NAND(x,1)=NOT(x)=x_bar => dao bit<br>
=> NAND 11000011: set 6 bit giua thanh 1, dao 2 bit ngoai.`,

  870: `<b>Mach half adder:</b><br>
z (tong) = x XOR y (vi 1+1=0 co nho)<br>
c (carry) = x AND y (chi nho khi ca 2 la 1)<br>
=> A = XOR, B = AND.`,

  703: `<b>Xac suat chon 4 la bai chan tu 16 la:</b><br>
So la chan: 2,4,6,8,10,12,14,16 = 8 la<br>
C(8,4)/C(16,4) = 70/1820 = <b>1/26</b>`,

  // === Chapter 02: Kien truc may tinh ===

  859: `<b>Thoi gian truy cap bo nho trung binh:</b><br>
T_avg = hit_ratio x T_cache + miss_ratio x (T_cache + T_main)<br>
= 0.9x0.01 + 0.1x0.11<br>
= 0.009 + 0.011 = <b>0.020 us</b>`,

  14: `<b>Cache nhieu cap:</b><br>
T = T_L1 + miss_L1 x (T_L2 + miss_L2 x T_main)<br>
= 1 + 0.05 x (10 + 0.5x100)<br>
= 1 + 0.05x60 = 1 + 3 = <b>3.7 cycles</b>`,

  557: `<b>Pipeline - thoi gian moi lenh:</b><br>
Moi clock = stage cham nhat = max(10,6,8,8) = <b>10 ns</b><br>
Throughput bi gioi han boi stage bottleneck.`,

  // Them giai thich tai day...
  // [ID]: "Giai thich",

};
