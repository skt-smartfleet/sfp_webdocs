---

markup: rst
title: "서비스 세부 절차"
menuTitle: "서비스 세부 절차"
weight: 300
chapter: true
pre: "3"

---

.. contents::
.. sectnum::
    :start: 3

.. |br| raw:: html

   <br />

서비스 세부 절차
=======================================

Smart[Fleet] 플랫폼을 사용하려는 파트너들을 위한 매뉴얼입니다. 파트너의 유형 별 플랫폼 사용 절차에 대해 설명합니다.


전체 세부 절차
--------------------------

.. class:: text-align-justify

Smart[Fleet] 플랫폼을 이용하기 위한 절차는 다음과 같이 구성되어 있습니다.

.. image:: ../images/procedure/1.png

위 절차들은 `Smart[Fleet] 웹 포털 사이트 </>`__ 에 접속하거나 플랫폼에서 제공하는 `Open API </apidocs>`__ 를 이용하여 이용할 수 있습니다.


파트너별 이용 안내
----------------------------

.. class:: text-align-justify

Smart[Fleet] 파트너 유형은 크게 3가지로 구분합니다.

1. **커넥티드카 서비스 사업자** : 차량을 이용하여 커넥티드카 사업을 하려고 하는 파트너
2. **Device 개발자** : 차량 내 부착되는 Device를 개발하는 파트너
3. **App 개발자** : Smart[Fleet] 플랫폼에서 제공하는 Open API를 활용하여 App을 개발하는 파트너

Smart[Fleet] 플랫폼을 이용하는 파트너 유형별로 아래 절차를 참고하셔서 본 파트너 매뉴얼을 활용하시면 보다 편리하게 이용하실 수 있습니다.


커넥티드카 서비스 사업자
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. 사업 문의

  .. class:: text-align-justify

  Smart[Fleet] 포털 ‘Support/사업문의’ 메뉴를 통해서 커넥티드카 서비스 및 Smart[Fleet] 플랫폼 활용방안 등에 대해서 문의를 하실 수 있습니다. 등록된 문의는 SKT Smart[Fleet] 사업 컨설팅 전문가에게 전달되어 전문가의 컨설팅 서비스를 받으실 수 있습니다. 고객사와 함께 할 협력사를 모집하고, SKT 담당자를 통해 센서 등 단말제조업체 등을 소개받을 수 있습니다.

2. 서비스 및 회사 등록

  .. class:: text-align-justify

  구체적인 사업 계획이 잡히고 SKT 담당자와의 협의가 완성되면 포털에서 서비스 등록을 신청합니다. 세부 절차는 `4.1. 서비스 등록 절차 <../entity/#41---service-registration>`_ 를 참고하시기 바랍니다.

3. 협력사 등록

  .. class:: text-align-justify

  서비스 및 함께 사업을 할 협력회사를 등록합니다. 귀사로부터 귀사의 차량을 위임받을 수도 있고, 반대로 협력사의 차량을 위임받아서 귀사가 관리할 수 있습니다.
  세부 절차는 `4.2. 회사(협력사) 등록 절차 <../entity/#42---company-partner-registration>`_ 를 참고하시기 바랍니다.

4. 차량 등록

  .. class:: text-align-justify

  커넥티드카 서비스 대상 차량을 등록합니다. 차량 내 각종 정보를 수집하기 위해서 부착되는 센서들이 차량 정보를 인식할 수 있도록 차량에 대한 자세한 정보를 입력합니다.
  세부 절차는 `4.3. 차량 등록 절차 <../entity/#43---vehicle-registration>`_ 를 참고하시기 바랍니다.

5. 센서 등록

  .. class:: text-align-justify

  등록한 차량에 부착된, 또는 부착할 센서 장치 등을 등록합니다. 세부 절차는 `4.4. 센서 등록 절차 <../entity/#44---sensor-registration>`_ 를 참고하시기 바랍니다.

6. 차량과 센서 연결

  .. class:: text-align-justify

  차량과 센서를 포털에 등록하면 Smart[Fleet] 플랫폼이 자동으로 차량과 센서간 연결을 제어하고, 차량으로부터 커넥티드카 서비스를 위한 각종 정보들을 수집하기 시작합니다.

7. 디렉터 등록

  .. class:: text-align-justify

  등록된 차량이 다수이어서 소수의 관리자가 관리하기 어려울 경우에는 복수의 디렉터를 할당할 수 있습니다. 세부 절차는 `4.5. 디렉터 등록 절차 <../entity/#45---director-registration>`_ 를 참고하시기 바랍니다.

8. 드라이버 등록

  .. class:: text-align-justify

  차량을 관리하지 않지만 실제 운전을 담당할 운전자를 드라이버로 등록할 수 있습니다. 세부 절차는 `4.6. 운전자 등록 절차 <../entity/#46---driver-registration>`_ 를 참고하시기 바랍니다.

9. 차량 위임

  .. class:: text-align-justify

  커넥티드카 서비스 모델에 따라서 고객사의 차량을 협력사(예: 보험회사 등)에 관리권한을 위임할 수 있습니다. 위임받은 협력사는 귀사의 차량을 관리할 수 있으며, 차량관리 정보는 귀사에게 보고됩니다. 세부 절차는 `4.7. 위임회사 등록 절차 <../entity/#47----delegated-company-registration>`_ 를 참고하시기 바랍니다.



Device 개발자
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

차량 내 부착되는 Device는 Smart[Fleet] platform과 MQTT프로토콜을 이용하여 통신합니다. MQTT에 대한 자세한 사항은 `MQTT.org <http://mqtt.org/>`__ 를 참고하시기 바랍니다.

.. class:: text-align-justify

1. 사전 준비 사항

  .. class:: text-align-justify

  Smart[Fleet] 플랫폼을 사용하려면 서비스와 회사가 먼저 등록되어야 합니다. `4.1. 서비스 등록 절차 <../entity/#41---service-registration>`_ , `4.2. 회사(협력사) 등록 절차 <../entity/#42---company-partner-registration>`_ 를 참고하여 Smart[Fleet] 플랫폼에 연결하는 방법을 확인시기 바랍니다.

2. Activation

  .. class:: text-align-justify

  Device에 따라 Activation이 필요할 수도 있습니다. Activation이 필요한 센서에 대해서는 `4.3. 차량 등록 절차 <../entity/#43---vehicle-registration>`_ 절차 내용을 참고하시기 바랍니다.

3. 메시지 전송

  .. class:: text-align-justify

  Smart[Fleet] 플랫폼과 연결이 완료되면 차량 내 부착된 센서들로부터 수집된 정보를 플랫폼으로 전송하기 시작합니다. 세부 절차는 `4.4. 센서 등록 절차 <../entity/#44---sensor-registration>`_ 절차를 참고하시기 바랍니다.

  차량 내 센서가 Smart[Fleet] 플랫폼으로 센싱한 정보를 정상적으로 전송하기 위해서는 Smart[Fleet] 플랫폼에서 정의한 단말기 메시지 포맷을 맞추어야 합니다. 단말기 메시지 포맷 규격은 `7. 메시지 포맷 <../message>`_ 내용을 참고하시기 바랍니다.

4. RPC

  .. class:: text-align-justify

  어플리케이션에서 센서로부터 특정 데이터를 요구하거나, 특정 행동을 요청할 경우에는 RPC를 사용합니다. RPC 이용 절차는 `5.2. Sensor RPC <../device/#53-device-rpc>`_ 내용을 참고하시기 바랍니다.

5. SDK

  .. class:: text-align-justify

  마지막으로 SDK를 참고하여 개발을 하실 수 있습니다. ODB2나 ADAS와 같이 센서가 부착된 디바이스를 개발하는 개발자는 `9.1. Embedded-C SDK <../sdk/#91-embedded-c>`_ 를 참고하시고, 스마트폰의 GPS를 사용하여 개발하는 개발자는 `9.2 Android SDK <../sdk/#92-android>`_ , `9.3. Object-C(iOS) SDK <../sdk/#93-ios>`_ 내용을 참고하시기 바랍니다.


App 개발자
~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

Smart[Fleet] 에서 제공하는 포털을 사용하지 않을 경우 고객사에서 자체적으로 App을 제작할 수 있습니다. 자체 App 개발을 진행하는 경우에는 Smart[Fleet] 플랫폼에서 제공하는 Open API를 활용하여 커넥티드카 서비스 App을 보다 쉽게 개발할 수 있습니다.

.. class:: text-align-justify

1. 구성 요소 등록

  .. class:: text-align-justify

  우선 Smart[Fleet] 구성 요소의 등록 방법은 `4. 구성요소(Entity) 등록 <../entity/>`_ 절차를 통해서 자세하게 확인할 수 있습니다.

2. Open API

  .. class:: text-align-justify

  Smart[Fleet] 플랫폼은 Restful Open API를 제공합니다. API를 통해 Smart[Fleet] 플랫폼에 데이터를 만들고 조회할 수 있습니다. Open API 규격에 대해서는 `6. API 규격 <../api/>`_ 내용을 참고하시기 바랍니다.

3. 메시지 포맷

  .. class:: text-align-justify

  차량에 부착된 센서들로부터 전송되는 자동차 운행과 관련된 정보의 메시지 포맷은 `7. 단말기 메시지 포맷 <../message/>`_ 내용을 참고하시기 바랍니다.

.. class:: text-align-justify

Web App을 개발하는 개발자는 `10.2. Web Application Simulator <../simulator/#102-smartfleet-web-application-simulator>`_ 내용을 참고하시기 바랍니다.

|br|

.. _entity-procedure: