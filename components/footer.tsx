import Link from 'next/link'


export default function Footer() {
    return (
        <footer className="bg-white my-8 text-center">
            <Link href="/nabidka">
            <a
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            >
                Nabídnout pomoc
            </a>
            </Link>
            <Link href="/faq">
            <a
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            >
                Často kladené otázky
            </a>
            </Link>
            <Link href="/nabidky">
            <a
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            >
                Nabídky pomoci
            </a>
            </Link>
             <p className="mt-4 text-center text-base text-gray-400">Provozuje Konsorcium nevládních organizací pracujících s migranty v ČR, z.s. <br />
                Havlíčkovo náměstí 2, 130 00 Praha 3-Žižkov, IČO: 266 20 553</p>
        </footer>
    )
}
