import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { PageHero, Section } from '../components/Page';
import { useLocale, type LanguageCode } from '../i18n';
import { EARLY_ACCESS_TABLE, supabase } from '../lib/supabase';

type Platform = 'ios' | 'android';

type EarlyAccessCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cardTitle: string;
  cardLead: string;
  deviceLabel: string;
  ios: string;
  android: string;
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  submitting: string;
  finePrint: string;
  successTitle: string;
  successBody: string;
  duplicateTitle: string;
  duplicateBody: string;
  errorConfig: string;
  errorGeneric: string;
  backHome: string;
};

const copyByLanguage: Record<LanguageCode, EarlyAccessCopy> = {
  en: {
    eyebrow: 'Free early access',
    title: 'Register for MIDORIGO early access',
    intro:
      'Choose your device and leave your email. We will contact you when MIDORIGO early access is ready.',
    cardTitle: 'Reserve your spot',
    cardLead: 'Pick the device you plan to use, then enter the email you want us to contact.',
    deviceLabel: 'Your device',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    submit: 'Register early access for free',
    submitting: 'Registering...',
    finePrint:
      'We store your email and device preference to manage MIDORIGO early access, launch communication, and future app onboarding. If MIDORIGO moves into general release, this registration may remain linked to your future access unless you request deletion.',
    successTitle: 'You are registered',
    successBody:
      'Thanks for registering for early access. MIDORIGO will be available soon. Please keep an eye on your email for early access updates and next steps.',
    duplicateTitle: 'You are already on the list',
    duplicateBody:
      'This email is already registered for that device. We will email you when MIDORIGO early access is ready.',
    errorConfig: 'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.',
    errorGeneric: 'We could not save your registration right now. Please try again in a moment.',
    backHome: 'Back to home',
  },
  ja: {
    eyebrow: '無料の先行登録',
    title: 'MIDORIGOの先行登録',
    intro: 'ご利用予定の端末を選び、メールアドレスを登録してください。MIDORIGOの先行案内が始まり次第ご連絡します。',
    cardTitle: '先行アクセスを予約',
    cardLead: '利用予定の端末を選び、連絡を受け取りたいメールアドレスを入力してください。',
    deviceLabel: '利用端末',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'you@example.com',
    submit: '無料で先行登録する',
    submitting: '登録中...',
    finePrint:
      'このメールアドレスと端末情報は、MIDORIGOの先行案内、公開連絡、今後のアプリ利用開始手続きのために保存されます。MIDORIGOが一般公開に移行した場合、この登録情報は削除依頼がない限り今後の利用情報と紐づくことがあります。',
    successTitle: '登録が完了しました',
    successBody:
      '先行登録ありがとうございます。MIDORIGOはまもなくご案内予定です。先行案内と次のご連絡をメールでお送りしますので、ご確認ください。',
    duplicateTitle: 'すでに登録されています',
    duplicateBody:
      'このメールアドレスは、その端末向けにすでに登録されています。MIDORIGOの先行案内準備ができ次第メールでご連絡します。',
    errorConfig: 'Supabaseがまだ設定されていません。.env に VITE_SUPABASE_URL と VITE_SUPABASE_ANON_KEY を追加してください。',
    errorGeneric: '現在登録を保存できませんでした。少し待ってから再度お試しください。',
    backHome: 'ホームへ戻る',
  },
  ko: {
    eyebrow: '무료 얼리 액세스',
    title: 'MIDORIGO 얼리 액세스 등록',
    intro: '사용할 기기를 고르고 이메일을 남겨 주세요. MIDORIGO 얼리 액세스 준비가 되면 연락드리겠습니다.',
    cardTitle: '자리 예약',
    cardLead: '사용할 기기를 선택한 뒤 연락받을 이메일을 입력하세요.',
    deviceLabel: '사용 기기',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: '이메일 주소',
    emailPlaceholder: 'you@example.com',
    submit: '무료 얼리 액세스 등록',
    submitting: '등록 중...',
    finePrint: '이 이메일과 기기 정보는 MIDORIGO 얼리 액세스 안내, 출시 소식, 이후 앱 온보딩을 위해 저장됩니다. MIDORIGO가 정식 출시로 이어질 경우 삭제 요청이 없는 한 이 등록 정보는 이후 접근 정보와 연결될 수 있습니다.',
    successTitle: '등록이 완료되었습니다',
    successBody: '얼리 액세스에 등록해 주셔서 감사합니다. MIDORIGO는 곧 제공될 예정입니다. 얼리 액세스 안내와 다음 정보를 이메일로 확인해 주세요.',
    duplicateTitle: '이미 등록되어 있습니다',
    duplicateBody: '이 이메일은 해당 기기로 이미 등록되어 있습니다. MIDORIGO 얼리 액세스 준비가 되면 이메일로 안내드리겠습니다.',
    errorConfig: 'Supabase가 아직 설정되지 않았습니다. .env에 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 추가하세요.',
    errorGeneric: '지금은 등록을 저장할 수 없습니다. 잠시 후 다시 시도해 주세요.',
    backHome: '홈으로 돌아가기',
  },
  zh: {
    eyebrow: '免费抢先注册',
    title: '注册 MIDORIGO 抢先体验',
    intro: '请选择你的设备并留下邮箱。MIDORIGO 抢先体验开放后，我们会联系你。',
    cardTitle: '预留名额',
    cardLead: '选择你计划测试的设备，然后填写你希望接收通知的邮箱。',
    deviceLabel: '你的设备',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: '电子邮箱',
    emailPlaceholder: 'you@example.com',
    submit: '免费注册抢先体验',
    submitting: '提交中...',
    finePrint: '我们会保存你的邮箱和设备偏好，用于 MIDORIGO 抢先体验、上线通知以及后续应用启用。如果 MIDORIGO 进入正式发布阶段，除非你请求删除，这份注册信息可能会继续关联到你未来的访问。',
    successTitle: '你已注册成功',
    successBody: '感谢你加入抢先体验。MIDORIGO 即将开放，请留意邮箱中的抢先体验通知和后续说明。',
    duplicateTitle: '你已经在名单中',
    duplicateBody: '这个邮箱已为该设备注册。MIDORIGO 抢先体验准备好后，我们会通过邮件通知你。',
    errorConfig: 'Supabase 还没有配置。请在 .env 中添加 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY。',
    errorGeneric: '暂时无法保存你的注册，请稍后再试。',
    backHome: '返回首页',
  },
  id: {
    eyebrow: 'Akses awal gratis',
    title: 'Daftar akses awal MIDORIGO',
    intro: 'Pilih perangkat Anda dan masukkan email. Kami akan menghubungi Anda saat akses awal MIDORIGO siap.',
    cardTitle: 'Pesan tempat Anda',
    cardLead: 'Pilih perangkat yang akan Anda gunakan, lalu masukkan email yang ingin kami hubungi.',
    deviceLabel: 'Perangkat Anda',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: 'Alamat email',
    emailPlaceholder: 'you@example.com',
    submit: 'Daftar akses awal gratis',
    submitting: 'Mendaftarkan...',
    finePrint: 'Kami menyimpan email dan preferensi perangkat Anda untuk mengelola akses awal MIDORIGO, komunikasi peluncuran, dan proses onboarding aplikasi berikutnya. Jika MIDORIGO masuk ke rilis umum, pendaftaran ini dapat tetap terhubung ke akses Anda di masa depan kecuali Anda meminta penghapusan.',
    successTitle: 'Pendaftaran berhasil',
    successBody: 'Terima kasih sudah mendaftar akses awal. MIDORIGO akan segera tersedia. Mohon periksa email Anda untuk pembaruan akses awal dan langkah berikutnya.',
    duplicateTitle: 'Anda sudah terdaftar',
    duplicateBody: 'Email ini sudah terdaftar untuk perangkat tersebut. Kami akan mengirim email saat akses awal MIDORIGO siap.',
    errorConfig: 'Supabase belum dikonfigurasi. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env.',
    errorGeneric: 'Kami belum bisa menyimpan pendaftaran Anda sekarang. Silakan coba lagi sebentar lagi.',
    backHome: 'Kembali ke beranda',
  },
  hi: {
    eyebrow: 'मुफ्त प्रारंभिक एक्सेस',
    title: 'MIDORIGO प्रारंभिक एक्सेस के लिए पंजीकरण करें',
    intro: 'अपना डिवाइस चुनें और ईमेल दर्ज करें। MIDORIGO प्रारंभिक एक्सेस तैयार होने पर हम आपसे संपर्क करेंगे।',
    cardTitle: 'अपनी जगह सुरक्षित करें',
    cardLead: 'जिस डिवाइस का आप उपयोग करेंगे उसे चुनें, फिर वह ईमेल दर्ज करें जिस पर हम संपर्क करें।',
    deviceLabel: 'आपका डिवाइस',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'you@example.com',
    submit: 'मुफ्त प्रारंभिक एक्सेस दर्ज करें',
    submitting: 'पंजीकरण हो रहा है...',
    finePrint: 'हम आपका ईमेल और डिवाइस पसंद MIDORIGO प्रारंभिक एक्सेस, लॉन्च संचार और भविष्य के ऐप ऑनबोर्डिंग के लिए सहेजते हैं। यदि MIDORIGO सामान्य रिलीज़ में जाता है, तो डिलीशन अनुरोध न होने पर यह पंजीकरण आपके भविष्य के एक्सेस से जुड़ा रह सकता है।',
    successTitle: 'आपका पंजीकरण हो गया',
    successBody: 'प्रारंभिक एक्सेस में जुड़ने के लिए धन्यवाद। MIDORIGO जल्द उपलब्ध होगा। कृपया प्रारंभिक एक्सेस अपडेट और अगले चरणों के लिए अपना ईमेल देखते रहें।',
    duplicateTitle: 'आप पहले से सूची में हैं',
    duplicateBody: 'यह ईमेल उस डिवाइस के लिए पहले से पंजीकृत है। MIDORIGO प्रारंभिक एक्सेस तैयार होने पर हम आपको ईमेल करेंगे।',
    errorConfig: 'Supabase अभी कॉन्फ़िगर नहीं है। .env में VITE_SUPABASE_URL और VITE_SUPABASE_ANON_KEY जोड़ें।',
    errorGeneric: 'अभी आपका पंजीकरण सहेजा नहीं जा सका। कृपया थोड़ी देर बाद फिर प्रयास करें।',
    backHome: 'होम पर वापस जाएँ',
  },
  my: {
    eyebrow: 'အခမဲ့ အစောပိုင်းဝင်ရောက်ခွင့်',
    title: 'MIDORIGO အစောပိုင်းဝင်ရောက်ခွင့်အတွက် စာရင်းသွင်းပါ',
    intro: 'သင့်စက်ကိုရွေးပြီး အီးမေးလ်ထည့်ပါ။ MIDORIGO အစောပိုင်းဝင်ရောက်ခွင့် အဆင်သင့်ဖြစ်သောအခါ ကျွန်ုပ်တို့ ဆက်သွယ်ပါမည်။',
    cardTitle: 'နေရာယူထားပါ',
    cardLead: 'အသုံးပြုမည့် device ကိုရွေးပြီး ဆက်သွယ်လိုသည့် email ကို ထည့်ပါ။',
    deviceLabel: 'သင့် device',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: 'အီးမေးလ်လိပ်စာ',
    emailPlaceholder: 'you@example.com',
    submit: 'အခမဲ့ အစောပိုင်းဝင်ရောက်ခွင့် စာရင်းသွင်းရန်',
    submitting: 'စာရင်းသွင်းနေသည်...',
    finePrint: 'ဤအီးမေးလ်နှင့် device ရွေးချယ်မှုကို MIDORIGO အစောပိုင်းဝင်ရောက်ခွင့်၊ ထုတ်ဝေမှုဆိုင်ရာ အသိပေးချက်များနှင့် နောင်လာမည့် app onboarding အတွက် သိမ်းဆည်းမည်။ MIDORIGO သည် public release သို့ ရောက်ရှိသွားပါက ဖျက်ပစ်ရန်မတောင်းဆိုသရွေ့ ဤစာရင်းသွင်းမှုသည် နောင်အသုံးပြုခွင့်နှင့် ဆက်နွယ်နေနိုင်သည်။',
    successTitle: 'စာရင်းသွင်းမှု အောင်မြင်ပါသည်',
    successBody: 'အစောပိုင်းဝင်ရောက်ခွင့်တွင် ပါဝင်ပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။ MIDORIGO ကို မကြာမီရရှိနိုင်မည်ဖြစ်ပြီး အစောပိုင်းဝင်ရောက်ခွင့် အပ်ဒိတ်နှင့် နောက်ဆင့်များကို email မှ ကြည့်ရှုပါ။',
    duplicateTitle: 'သင်သည် စာရင်းတွင်ရှိပြီးဖြစ်သည်',
    duplicateBody: 'ဤအီးမေးလ်သည် ထို device အတွက် စာရင်းသွင်းပြီးဖြစ်သည်။ MIDORIGO အစောပိုင်းဝင်ရောက်ခွင့် အဆင်သင့်ဖြစ်သောအခါ email ပို့ပါမည်။',
    errorConfig: 'Supabase ကို မသတ်မှတ်ရသေးပါ။ .env တွင် VITE_SUPABASE_URL နှင့် VITE_SUPABASE_ANON_KEY ထည့်ပါ။',
    errorGeneric: 'ယခုအချိန်တွင် စာရင်းသွင်းမှုကို မသိမ်းဆည်းနိုင်ပါ။ ခဏနားပြီး ထပ်မံစမ်းကြည့်ပါ။',
    backHome: 'ပင်မသို့ ပြန်သွားရန်',
  },
  vi: {
    eyebrow: 'Đăng ký dùng thử miễn phí',
    title: 'Đăng ký truy cập sớm MIDORIGO',
    intro: 'Chọn thiết bị của bạn và để lại email. Chúng tôi sẽ liên hệ khi truy cập sớm MIDORIGO sẵn sàng.',
    cardTitle: 'Giữ chỗ cho bạn',
    cardLead: 'Chọn thiết bị bạn định test, sau đó nhập email bạn muốn chúng tôi liên hệ.',
    deviceLabel: 'Thiết bị của bạn',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: 'Địa chỉ email',
    emailPlaceholder: 'you@example.com',
    submit: 'Đăng ký dùng thử miễn phí',
    submitting: 'Đang đăng ký...',
    finePrint: 'Chúng tôi lưu email và lựa chọn thiết bị của bạn để quản lý truy cập sớm MIDORIGO, thông báo phát hành và quá trình vào app sau này. Nếu MIDORIGO chuyển sang phát hành rộng rãi, đăng ký này có thể vẫn gắn với quyền truy cập sau này của bạn trừ khi bạn yêu cầu xóa.',
    successTitle: 'Bạn đã đăng ký thành công',
    successBody: 'Cảm ơn bạn đã tham gia truy cập sớm. MIDORIGO sẽ sớm có mặt. Hãy để ý email để nhận cập nhật truy cập sớm và các bước tiếp theo.',
    duplicateTitle: 'Bạn đã có trong danh sách',
    duplicateBody: 'Email này đã được đăng ký cho thiết bị đó. Chúng tôi sẽ gửi email khi truy cập sớm MIDORIGO sẵn sàng.',
    errorConfig: 'Supabase chưa được cấu hình. Hãy thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào .env.',
    errorGeneric: 'Hiện tại chúng tôi chưa thể lưu đăng ký của bạn. Vui lòng thử lại sau ít phút.',
    backHome: 'Quay về trang chủ',
  },
  es: {
    eyebrow: 'Acceso anticipado gratis',
    title: 'Regístrate para acceso anticipado a MIDORIGO',
    intro: 'Elige tu dispositivo y deja tu correo. Te contactaremos cuando el acceso anticipado de MIDORIGO esté listo.',
    cardTitle: 'Reserva tu lugar',
    cardLead: 'Elige el dispositivo con el que vas a probar la app y luego ingresa el correo con el que quieres que te contactemos.',
    deviceLabel: 'Tu dispositivo',
    ios: 'iPhone / iPad',
    android: 'Android',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'you@example.com',
    submit: 'Regístrate gratis al acceso anticipado',
    submitting: 'Registrando...',
    finePrint: 'Guardamos tu correo y tu preferencia de dispositivo para gestionar el acceso anticipado de MIDORIGO, la comunicación de lanzamiento y la futura incorporación a la app. Si MIDORIGO pasa a una versión pública, este registro puede seguir vinculado a tu acceso futuro salvo que solicites su eliminación.',
    successTitle: 'Tu registro fue exitoso',
    successBody: 'Gracias por unirte al acceso anticipado. MIDORIGO estará disponible pronto. Mantente atento a tu correo para recibir novedades de acceso anticipado y los siguientes pasos.',
    duplicateTitle: 'Ya estás en la lista',
    duplicateBody: 'Este correo ya está registrado para ese dispositivo. Te enviaremos un correo cuando el acceso anticipado de MIDORIGO esté listo.',
    errorConfig: 'Supabase todavía no está configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.',
    errorGeneric: 'No pudimos guardar tu registro ahora mismo. Inténtalo de nuevo en un momento.',
    backHome: 'Volver al inicio',
  },
};

function isDuplicateError(message: string) {
  const text = message.toLowerCase();
  return text.includes('duplicate') || text.includes('unique');
}

export function EarlyAccess() {
  const { language } = useLocale();
  const copy = useMemo(() => copyByLanguage[language] ?? copyByLanguage.en, [language]);
  const [platform, setPlatform] = useState<Platform>('ios');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMode, setSuccessMode] = useState<'idle' | 'success' | 'duplicate'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMode('idle');

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return;
    }

    if (!supabase) {
      setErrorMessage(copy.errorConfig);
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from(EARLY_ACCESS_TABLE).insert({
      email: normalizedEmail,
      platform,
      locale: language,
      source: 'website',
    });
    setIsSubmitting(false);

    if (error) {
      if (isDuplicateError(error.message)) {
        setSuccessMode('duplicate');
        setEmail('');
        return;
      }
      setErrorMessage(copy.errorGeneric);
      return;
    }

    setSuccessMode('success');
    setEmail('');
  }

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

      <Section className="surface-band">
        <div className="signup-shell">
          <div className="signup-card">
            <h2>{copy.cardTitle}</h2>
            <p className="section-lead">{copy.cardLead}</p>

            <form className="signup-form" onSubmit={handleSubmit}>
              <fieldset className="device-fieldset">
                <legend>{copy.deviceLabel}</legend>
                <div className="device-toggle" role="radiogroup" aria-label={copy.deviceLabel}>
                  <button
                    type="button"
                    className={platform === 'ios' ? 'device-option active' : 'device-option'}
                    onClick={() => setPlatform('ios')}
                    aria-pressed={platform === 'ios'}
                  >
                    {copy.ios}
                  </button>
                  <button
                    type="button"
                    className={platform === 'android' ? 'device-option active' : 'device-option'}
                    onClick={() => setPlatform('android')}
                    aria-pressed={platform === 'android'}
                  >
                    {copy.android}
                  </button>
                </div>
              </fieldset>

              <label>
                <span>{copy.emailLabel}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  placeholder={copy.emailPlaceholder}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <button className="button primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? copy.submitting : copy.submit}
              </button>
            </form>

            <p className="signup-note">{copy.finePrint}</p>

            {errorMessage ? (
              <div className="signup-feedback error" role="alert">
                <strong>{errorMessage}</strong>
              </div>
            ) : null}

            {successMode === 'success' ? (
              <div className="signup-feedback success" role="status">
                <strong>{copy.successTitle}</strong>
                <p>{copy.successBody}</p>
              </div>
            ) : null}

            {successMode === 'duplicate' ? (
              <div className="signup-feedback success" role="status">
                <strong>{copy.duplicateTitle}</strong>
                <p>{copy.duplicateBody}</p>
              </div>
            ) : null}

            <Link className="inline-backlink" to="/">
              {copy.backHome}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
