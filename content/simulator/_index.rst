---

markup: rst
title: "테스트용 시뮬레이터"
menuTitle: "테스트용 시뮬레이터"
weight: 1000
chapter: true
pre: "10"

---

.. contents::
.. sectnum::
    :start: 10

.. |br| raw:: html

   <br />

테스트용 시뮬레이터
============================

.. class:: text-align-justify

본 가이드 문서 중 `5. Device 연동 절차 <../device/>`_ 또는 아래 그림의 서비스 연동 기본 절차에서 볼 수 있듯이 서비스를 이용하려면 어플리케이션과 디바이스(센서) 둘다 필요합니다.

.. image:: ../images/simulator/7.png

SKT에서는 개발 파트너분들 중 센서/디바이스 혹은 어플리케이션 하나만 테스트를 원할 경우를 대비하여 디바이스/센서 및 애플리케이션 대행 역할을 담당하는 테스트용 시뮬레이터를 제공합니다.

|br|

Smart[Fleet] Device Simulator
---------------------------------------------------

.. class:: text-align-justify

본 시뮬레이터는 SKT의 Smart[Fleet] 플랫폼 프로토콜을 따르는 GPS, OBD 단말의 동작을 나타내는 시뮬레이터입니다. 해당 시뮬레이터에 대한 추가 사용 설명과 프로그램 다운로드는 아래 사이트를 방문하시기 바랍니다.

.. class:: text-align-justify

- Smart[Fleet] Device Simulator : https://github.com/skt-smartfleet/device-simulator-nodejs

.. image:: ../images/simulator/7_1.png

.. class:: text-align-justify

해당 시뮬레이터는 node.js 기반으로 구현되어 있습니다.  본 시뮬레이터가 정상적으로 동작하기 위해서는 node.js가 설치되어 있어야 합니다.
|br|
동작을 위한 설정은 본 Repository의 config.js 파일에 기술되어 있습니다. 해당 설정을 수정하여 각자에 상황에 맞추어 시뮬레이션을 수행할 수 있습니다.
|br|
수정이 필요한 사항은 다음과 같습니다.

.. class:: table-width-fix
.. class:: text-align-justify

+-----------------------+---------------------------------------------------------------------------+
| Key                   | Description                                                               |
+=======================+===========================================================================+
| userName              | Accesstoken 값을 기입해야 합니다. 시뮬레이션을 위한 20자리의 Token 값을   |
|                       | 발급받기 위해서는 아래 주석을 참고 바랍니다.                              |
+-----------------------+---------------------------------------------------------------------------+
| updateInterval        | 단말이 메시지를 업로드 하는 주기를 명시합니다. (msec)                     |
+-----------------------+---------------------------------------------------------------------------+
| microtripcnt          | 단말이 주기 정보를 보내는 총 개수를 명시합니다.                           |
+-----------------------+---------------------------------------------------------------------------+
| deviceType            | 시뮬레이션을 돌리고자 하는 디바이스 타입을 명시합니다. (GPS / OBD)        |
+-----------------------+---------------------------------------------------------------------------+

    1) 아래 명령어를 이용하여 JWT Token을 발급 받습니다.

      - curl --request POST --url {url}/api/auth/login --header 'Cache-Control: no-cache' --header 'Content-Type: application/json' --data '{"username":"{발급받은 ID}","password":"{발급받은 PW}"}'
      - EX) curl --request POST --url https://smartfleet.sktelecom.com:9901/api/auth/login --header 'Cache-Control: no-cache' --header 'Content-Type: application/json' --data '{"username":"123@test.com","password":"123123"}'

    2) 발급 받은 Token을 아래 명령어에 붙여 userName에 넣을 20자리 Accesstoken의 앞 5자리 글자("tokenPrefix" 값 확인)를 발급 받습니다.
    
      - curl --request GET --url {url}/api/tre/v1/company/me --header 'Cache-Control: no-cache' --header 'Content-Type: application/json' --header 'X-Authorization: Bearer {발급받은 Token}'
      - EX) curl --request GET --url https://smartfleet.sktelecom.com:9901/api/tre/v1/company/me --header 'Cache-Control: no-cache' --header 'Content-Type: application/json' --header 'X-Authorization: Bearer {발급받은 Token}'

    3) 위에서 발급 받은 5자리 글자를 시작으로 20자리 Accesstoken을 임의로 만들어 userName에 넣습니다

.. _Repository Issue: https://github.com/skt-smartfleet/device-simulator-nodejs/issues

|br|
|br|


.. _web-application-simulator:

Smart[Fleet] Web Application Simulator
-----------------------------------------------------

.. class:: text-align-justify

Smart[Fleet]  Web Application Simulator는 OBD 운행 데이터 확인 및 RPC 요청 기능을 구현한 웹 애플리케이션입니다. 추가 사용 설명과 프로그램 다운로드는 아래 사이트를 방문하시기 바랍니다.

.. class:: text-align-justify

- Smart[Fleet] Web Application Simulator : https://github.com/skt-smartfleet/simpleweb

.. image:: ../images/simulator/7_2.png

.. class:: text-align-justify

해당 애플리케이션은 node.js 기반으로 구현되어 있습니다. 본 시뮬레이터가 정상적으로 동작하기 위해서는 node.js가 설치되어 있어야 합니다.
|br|
애플리케이션을 이용하기 위해 차량, 센서 정보가 있는 `Smart [Fleet] </>`__ 계정과 `SK 개발자센터 <https://developers.sktelecom.com/>`__ 에서 제공하는 API 인증키가 필요합니다.
계정이 없는 경우 본 가이드 문서 `4. 구성요소 등록 절차 <../entity/>`_ 를 참조하여 계정을 생성하시기 바랍니다.
인증키가 없는 경우 `SK 개발자센터 API 이용방법 <https://developers.sktelecom.com/resource/development/>`__ 을 참조하여 인증키를 발급받으실 수 있습니다.

|br|
