import React from 'react'


export const DashSideNav = ({classNames, sidebarNavigation}) => {

    return (
        <div className="hidden w-28 h-screen bg-sky-400 overflow-y-auto md:block">
            <div className="w-full py-6 flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                        alt="Workflow"
                    />
                </div>
                <div className="flex-1 mt-6 w-full px-2 space-y-1">
                    {sidebarNavigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-white text-sky-400' : 'text-white hover:bg-white hover:text-sky-400',
                                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            <item.icon
                                className={classNames(
                                    item.current ? 'text-sky-400' : 'text-white group-hover:text-sky-400',
                                    'h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            <span className="mt-2">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
