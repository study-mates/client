import {
  currentStudyState,
  isOpenStudyListState,
  selectedStudyIdState,
} from '@/recoil/atoms';
import { getStudyList } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import PopupLayout from '../common/PopupLayout';
import Layout from '../common/Layout';
import Header from '../common/Header';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import Main from '../common/Main';
import { updateStudy } from '@/services/updateStudy';
import { useState, memo } from 'react';
import { createPortal } from 'react-dom';
import UpdateStudy from './UpdateStudy';

function StudyList() {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [rename, setRename] = useState<string>();
  const [selectedStudyId, setSelectedStudyId] = useState<string>();
  const [isOpenStudyList, setIsOpenStudyList] =
    useRecoilState(isOpenStudyListState);
  const [currentStudy, setCurrentStudy] = useRecoilState(currentStudyState);
  const { data: studyList, refetch } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });
  const { mutate } = useMutation(updateStudy, {
    onSuccess: () => refetch(),
  });

  const handleUpdate = () => {
    setIsOpenUpdate(false);

    if (!selectedStudyId || !rename) return;

    mutate({
      params: {
        studyId: selectedStudyId,
      },
      data: {
        description: rename,
      },
    });
  };

  const handleOpen = (studyId: string) => {
    setSelectedStudyId(studyId);
    setIsOpenUpdate(true);
  };

  const topEl = document.querySelector('#__next');

  return (
    <>
      {isOpenUpdate && topEl
        ? createPortal(
            <UpdateStudy
              onClose={() => setIsOpenUpdate(false)}
              onUpdate={handleUpdate}
              setRename={setRename}
            />,
            topEl
          )
        : null}
      <PopupLayout>
        <Layout>
          <Header>
            <ArrowLeftIcon onClick={() => setIsOpenStudyList(false)} />
            <div className="w-full relative flex justify-center">
              <p className="font-medium text-xl">스터디 목록</p>
            </div>
          </Header>

          <Main className="flex bg-white p-[24px] overflow-hidden overflow-y-auto">
            <ul className="flex flex-col flex-1 gap-[12px] py-[24px]">
              {studyList?.study.map((item) => (
                <li
                  key={item.studyId}
                  className="popup-list justify-between flex-wrap"
                >
                  <div className="flex items-center w-[192px] sm:w-3/5">
                    <p className="truncate">{item.description}</p>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <button>나가기</button>
                    {currentStudy?.role === 'master' && (
                      <>
                        <p>&nbsp;|&nbsp;</p>
                        <button onClick={() => handleOpen(item.studyId)}>
                          수정하기
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Main>
        </Layout>
      </PopupLayout>
    </>
  );
}

export default memo(StudyList);
