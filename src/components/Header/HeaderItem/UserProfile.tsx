import { Dropdown, MenuProps } from "antd";

export interface UserProfileProps {
    name: string;
    role: string;
    avatar: string;
}

interface UserProfile {
    prop: UserProfileProps
}

const items: MenuProps['items'] = [
    {
        label: (
            <a href="/logout" target="_blank" rel="noopener noreferrer">
                Log out
            </a>
        ),
        key: '0',
    },
];

const UserProfile = ({ prop }: UserProfile) => {
    return (
        <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow={{ pointAtCenter: true }}>
            <button>
                <div
                    className="flex px-1.5 py-1 rounded-lg border border-solid border-zinc-400 border-opacity-20">
                    <div className="flex gap-3">
                        <img
                            loading="lazy"
                            src={prop.avatar}
                            alt={`Profile picture of ${prop.name}`}
                            className="object-contain shrink-0 rounded-lg aspect-[0.85] w-[45px]"
                        />
                        <div className="flex flex-col my-auto min-h-[40px]">
                            <div className="text-left text-base font-semibold text-zinc-900">{prop.name}</div>
                            <div className="text-left text-xs font-light text-zinc-400">{prop.role}</div>
                        </div>
                    </div>
                </div>
            </button>
        </Dropdown>
    )
}

export default UserProfile