"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = usePathname();

  return (
    <>
      <section className="user-dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="user-dashboard-inner">
                <div className="user-dashboard-list">
                  <ul>
                    <li><Link href={"/my/profile"} className={router == '/my/profile' || router == '/my' ? "active" : ''}><Image width={22} height={22} src="/images/user-dashboard/icons/1.svg" alt="" /> My Profile</Link></li>
                    <li><Link href={"/my/voopons"} className={router == '/my/voopons' ? "active" : ''}><Image width={22} height={22} src="/images/user-dashboard/icons/2.svg" alt="" /> My Voopons</Link></li>
                    <li><Link href={"/my/events"} className={router == '/my/events' ? "active" : ''}><Image width={22} height={22} src="/images/user-dashboard/icons/3.svg" alt="" /> My Events</Link></li>
                    <li><Link href={"/payment-method"} className={router == '/payment-method' ? "active" : ''}><Image width={22} height={22} src="/images/user-dashboard/icons/4.svg" alt="" /> Payment Method</Link></li>
                    <li><Link href={"/my/interests"} className={router == '/my/interests' ? "active" : ''}><Image width={22} height={22} src="/images/user-dashboard/icons/5.svg" alt="" /> My Interests</Link></li>
                    <li><Link href={"/my/favorites"} className={router == '/my/favorites' ? "active" : ''}><Image width={22} height={22} src="/images/user-dashboard/icons/6.svg" alt="" /> My Favorites</Link></li>
                    <li><Link href={"/refer-friend"} className={router == '/refer-friend' ? "active" : ''}><Image width={22} height={22} src="/images/user-dashboard/icons/7.svg" alt="" /> Refer A Friend</Link></li>
                  </ul>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
