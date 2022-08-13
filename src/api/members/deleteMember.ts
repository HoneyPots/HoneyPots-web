import axios from 'libs/axios';

interface DeleteMemberParameter {
  memberId: number;
}

const deleteMember = async ({ memberId }: DeleteMemberParameter) => {
  await axios.delete(`/api/members/${memberId}`);
};

export default deleteMember;
