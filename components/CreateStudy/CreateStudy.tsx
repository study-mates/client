import Modal from '@/components/common/Modal';
import Input from '../common/Input';
import SaveButton from '../common/SaveButton';
import CloseIcon from '../icons/CloseIcon';
import useInput from '@/hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { createStudy } from '@/services';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  first?: boolean;
  onClose: () => void;
};

function CreateStudy({ first = false, onClose }: Props) {
  const { value, onChange, reset } = useInput();
  const { data, mutate } = useMutation(createStudy);
  const router = useRouter();

  const handleCreateStudy = () => {
    mutate({ description: value });
  };

  useEffect(() => {
    if (first && data) {
      router.push(`/study/${data.createdId}`);
      console.log(data);
    }
  }, [data, first, router]);

  return (
    <Modal className="flex flex-col justify-between relative">
      <CloseIcon onClick={onClose} className="absolute top-3 right-3" />
      <div className="flex items-end h-[48px] py-[6px]">
        <p className="font-medium text-[20px] leading-[16px]">
          스터디 시작하기
        </p>
      </div>
      <div className="mt-auto">
        <div className="w-full h-[60px] flex items-end justify-between py-[6px]">
          <p className="input-title">스터디 명</p>
          <p className="text-[14px] leading-[20px] font-medium">최대 10자</p>
        </div>
        <Input
          type="text"
          placeholder="스터디명을 입력하세요"
          value={value}
          onChange={onChange}
          maxLength={10}
          reset={reset}
        />
        <SaveButton onClick={handleCreateStudy} disabled={value.length == 0}>
          저장하기
        </SaveButton>
      </div>
    </Modal>
  );
}

export default CreateStudy;
