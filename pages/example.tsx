import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

const Example: NextPage = () => {
  const { t, lang } = useTranslation('common')
  const example = t('example')
  return (
    <div>{example}</div>
  )
}


export default Example