import { test, expect } from 'vitest'
import { renderQueueXML } from './queue-xml'
import { QueueCommon } from '../../../website/app/utils/validators'

test('Render queue.xml, validates against XSD schema', async () => {
  const mockQueue: QueueCommon = {
    "generatedAtIso": "2026-04-07T06:08:56.117+00:00",
    "items": [
      {
        "name": "draft-ietf-ecrit-similar-location",
        "title": "A LoST extension to return complete and similar location info",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "B. Rosen",
            "isEditor": false
          },
          {
            "titlepageName": "R. Marshall",
            "isEditor": false
          },
          {
            "titlepageName": "J. Martin",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [452],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 19,
        "enqueuedAtIso": "2022-03-07T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-i2nsf-applicability",
        "title": "Applicability of Interfaces to Network Security Functions to Network-Based Security Services",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Jeong",
            "isEditor": false
          },
          {
            "titlepageName": "S. Hyun",
            "isEditor": false
          },
          {
            "titlepageName": "T. Ahn",
            "isEditor": false
          },
          {
            "titlepageName": "S. Hares",
            "isEditor": false
          },
          {
            "titlepageName": "D. Lopez",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [405],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 29,
        "enqueuedAtIso": "2019-12-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-jmap-calendars",
        "title": "JSON Meta Application Protocol (JMAP) for Calendars",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Jenkins",
            "isEditor": true
          },
          {
            "titlepageName": "M. Douglass",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Stream Hold",
            "themeColor": "red",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 61,
        "enqueuedAtIso": "2024-11-14T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-halen-fedae",
        "title": "Mutually Authenticating TLS in the context of Federations",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "S. Halen",
            "isEditor": false
          },
          {
            "titlepageName": "J. Schlyter",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Unresolved Action Holder"
                }
              }
            ]
          }
        ],
        "pages": 33,
        "enqueuedAtIso": "2025-07-30T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-halen-fedae",
              "rfcNumber": 9932
            },
            "logMessage": "2026-02-06: Questions sent to the authors.\r\n2026-02-08: Received author reply, all questions addressed.\r\n2026-02-10: Sent updated files.\r\n2026-02-15: Received XML file from authors with significant technical and editorial changes.\r\n2026-02-17: Per the ISE, AUTH48 is paused until we hear further.  The ISE is reviewing author-requested updates.\r\n2026-03-06: Received new XML file with substantial updates. \r\n2026-03-06: RFC Editor conducting another editorial pass.\r\n2026-04-01: Second edit pass complete. Sent updated files to authors with a few follow-up questions about new text. \r\n2026-04-02: Received author responses to all editorial questions and one author approval.",
            "timeIso": "2026-02-06T21:34:37.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-stir-servprovider-oob",
        "title": "Out-of-Band STIR for Service Providers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Peterson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 10,
        "enqueuedAtIso": "2025-07-23T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-stir-servprovider-oob",
              "rfcNumber": 9888
            },
            "logMessage": "2025-10-21: questions sent to author.\r\n2025-10-22: all queries resolved.",
            "timeIso": "2025-10-21T16:37:24.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-opsawg-oam-characterization",
        "title": "Guidelines for Characterizing the Term \"OAM\"",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "C. Pignataro",
            "isEditor": false
          },
          {
            "titlepageName": "A. Farrel",
            "isEditor": false
          },
          {
            "titlepageName": "T. Mizrahi",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 13,
        "enqueuedAtIso": "2026-01-28T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pquip-pqc-engineers",
        "title": "Post-Quantum Cryptography for Engineers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. Banerjee",
            "isEditor": false
          },
          {
            "titlepageName": "T. Reddy",
            "isEditor": false
          },
          {
            "titlepageName": "D. Schoinianakis",
            "isEditor": false
          },
          {
            "titlepageName": "T. Hollebeek",
            "isEditor": false
          },
          {
            "titlepageName": "M. Ounsworth",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 50,
        "enqueuedAtIso": "2025-09-09T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tsvwg-careful-resume",
        "title": "Convergence of Congestion Control from Retained State",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Kuhn",
            "isEditor": false
          },
          {
            "titlepageName": "E. Stephan",
            "isEditor": false
          },
          {
            "titlepageName": "G. Fairhurst",
            "isEditor": false
          },
          {
            "titlepageName": "R. Secchi",
            "isEditor": false
          },
          {
            "titlepageName": "C. Huitema",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 37,
        "enqueuedAtIso": "2025-09-17T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ippm-capacity-protocol",
        "title": "UDP Speed Test Protocol for One-way IP Capacity Metric Measurement",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. Morton",
            "isEditor": false
          },
          {
            "titlepageName": "L. Ciavattone",
            "isEditor": false
          },
          {
            "titlepageName": "R. Geib",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [570],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 69,
        "enqueuedAtIso": "2025-09-18T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-ippm-capacity-protocol",
              "rfcNumber": 9946
            },
            "logMessage": "2026-03-11: Questions sent to authors. Med (AD) to approve the document on behalf of A. Morton. AD reviewed the addition of the editor role for Geib and requested the affiliation for A. Morton to be added.\r\n2026-03-12: Responses received.\r\n2026-03-13: Responses received.\r\n2026-03-17: Responses received. AD approved changes to Sections 4.3.1 and 4.6.\r\n2026-03-18: Responses received. AD approved changes to Figure 11 (Section 7.2).\r\n2026-03-19: Response received.\r\n2026-03-20: Asked IANA to update their registries to match the edited document [IANA #1448253].\r\n2026-03-30: Updated document. Asked AD to approve new text in Section 12.3.8.\r\n2026-03-31: Response received. AD approval received. Asked IANA to add a note to their registry to match that in Section 12.3.8.\r\n2026-04-01: IANA actions are complete.",
            "timeIso": "2026-03-12T01:48:21.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-alto-oam-yang",
        "title": "YANG Data Models for the Application-Layer Traffic Optimization (ALTO) Protocol",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Zhang",
            "isEditor": false
          },
          {
            "titlepageName": "D. Dhody",
            "isEditor": false
          },
          {
            "titlepageName": "K. Gao",
            "isEditor": false
          },
          {
            "titlepageName": "R. Schott",
            "isEditor": false
          },
          {
            "titlepageName": "Q. Ma",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [463],
        "assignmentsByRoles": [],
        "pages": 86,
        "enqueuedAtIso": "2024-01-23T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-hybrid-design",
        "title": "Hybrid key exchange in TLS 1.3",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "D. Stebila",
            "isEditor": false
          },
          {
            "titlepageName": "S. Fluhrer",
            "isEditor": false
          },
          {
            "titlepageName": "S. Gueron",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [553],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 23,
        "enqueuedAtIso": "2025-09-17T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-tls-hybrid-design",
              "rfcNumber": 9954
            },
            "logMessage": "2026-04-03: Questions sent to authors.",
            "timeIso": "2026-04-03T16:41:10.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-i2nsf-consumer-facing-interface-dm",
        "title": "I2NSF Consumer-Facing Interface YANG Data Model",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Jeong",
            "isEditor": true
          },
          {
            "titlepageName": "C. Chung",
            "isEditor": false
          },
          {
            "titlepageName": "T. Ahn",
            "isEditor": false
          },
          {
            "titlepageName": "R. Kumar",
            "isEditor": false
          },
          {
            "titlepageName": "S. Hares",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [405],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Author Input Required"
                }
              }
            ]
          }
        ],
        "pages": 74,
        "enqueuedAtIso": "2023-06-21T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-suit-trust-domains",
        "title": "Software Update for the Internet of Things (SUIT) Manifest Extensions for Multiple Trust Domain",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "B. Moran",
            "isEditor": false
          },
          {
            "titlepageName": "K. Takayama",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [535],
        "assignmentsByRoles": [],
        "pages": 38,
        "enqueuedAtIso": "2025-07-23T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-roll-dao-projection",
        "title": "Root-initiated Routing State in RPL",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Thubert",
            "isEditor": true
          },
          {
            "titlepageName": "R. Arvind Jadhav",
            "isEditor": false
          },
          {
            "titlepageName": "M. Richardson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [538],
        "assignmentsByRoles": [
          {
            "role": "publisher"
          }
        ],
        "pages": 91,
        "enqueuedAtIso": "2025-03-11T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-roll-dao-projection",
              "rfcNumber": 9914
            },
            "logMessage": "approval received from AD",
            "timeIso": "2026-04-06T15:44:49.419+00:00"
          },
          {
            "rfcToBe": {
              "name": "draft-ietf-roll-dao-projection",
              "rfcNumber": 9914
            },
            "logMessage": "2026-02-27: Questions sent to authors.\r\n2026-03-05: Response received.\r\n2026-03-06: Response received.\r\n2026-03-09: Response received.\r\n2026-03-10: Response received.\r\n2026-03-11: Response received.\r\n2026-03-12: Response received.\r\n2026-03-14: Response received.\r\n2026-03-16: Response received.\r\n2026-03-17: Response received. Asked AD to approve Sections 2.4.5, 3.2, 3.6, 3.7.2.3, 3.7.2.4, 4.2, 5.2, 5.3, 6.4.1, 6.8, and 10 plus updates to Figure 19.\r\n2026-03-20: Response received. The authors are discussing updating a few figures.\r\n2026-03-30: Responses received.\r\n2026-03-31: AD approval received.\r\n2026-04-01: Response received. Asked AD to approve new updates to Figures 18 and 19. Asked IANA to update their registries accordingly [IANA #1449150].\r\n2026-04-03: IANA actions are complete.\r\n\r\nRPC Notes: \r\n- This document will be published at the same time as RFCs-to-be 9912 and 9913 (all cluster 538).",
            "timeIso": "2026-02-27T21:55:38.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-suit-mti",
        "title": "Cryptographic Algorithms for Internet of Things (IoT) Devices",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "B. Moran",
            "isEditor": false
          },
          {
            "titlepageName": "Ø. Rønningstad",
            "isEditor": false
          },
          {
            "titlepageName": "A. Tsukamoto",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [535],
        "assignmentsByRoles": [],
        "pages": 20,
        "enqueuedAtIso": "2025-07-23T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ccamp-otn-topo-yang",
        "title": "A YANG Data Model for Optical Transport Network Topology",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "H. Zheng",
            "isEditor": false
          },
          {
            "titlepageName": "I. Busi",
            "isEditor": false
          },
          {
            "titlepageName": "X. Liu",
            "isEditor": false
          },
          {
            "titlepageName": "S. Belotti",
            "isEditor": false
          },
          {
            "titlepageName": "O. Gonzalez de Dios",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received (2nd Generation)"
                }
              }
            ]
          }
        ],
        "pages": 92,
        "enqueuedAtIso": "2024-11-21T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ccamp-l1csm-yang",
        "title": "A YANG Data Model for L1 Connectivity Service Model (L1CSM)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Y. Lee",
            "isEditor": false
          },
          {
            "titlepageName": "K. Lee",
            "isEditor": false
          },
          {
            "titlepageName": "H. Zheng",
            "isEditor": false
          },
          {
            "titlepageName": "O. Gonzalez de Dios",
            "isEditor": false
          },
          {
            "titlepageName": "D. Ceccarelli",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received (2nd Generation)"
                }
              }
            ]
          }
        ],
        "pages": 19,
        "enqueuedAtIso": "2024-04-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-rfc8446bis",
        "title": "The Transport Layer Security (TLS) Protocol Version 1.3",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "E. Rescorla",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [430],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 162,
        "enqueuedAtIso": "2025-08-11T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-tls-rfc8446bis",
              "rfcNumber": 9846
            },
            "logMessage": "2025-12-15: questions sent to the author.\r\n2025-12-16: Paul Wouters noted a change would be forthcoming regarding \"a small change applied to it related to PKCS v1.5\". \r\n2025-12-16: author requested re-review for possible reversion of text not changed as part of this bis document. \r\n2025-12-22: updated file posted for review. \r\n2026-01-14: reminder sent.\r\n2026-01-30: reminder sent. Author confirmed no action needed by the RPC at this time.",
            "timeIso": "2025-12-16T04:57:07.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-suit-firmware-encryption",
        "title": "Encrypted Payloads in SUIT Manifests",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "H. Tschofenig",
            "isEditor": false
          },
          {
            "titlepageName": "R. Housley",
            "isEditor": false
          },
          {
            "titlepageName": "B. Moran",
            "isEditor": false
          },
          {
            "titlepageName": "D. Brown",
            "isEditor": false
          },
          {
            "titlepageName": "K. Takayama",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [535],
        "assignmentsByRoles": [],
        "pages": 54,
        "enqueuedAtIso": "2025-04-21T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-suit-manifest",
        "title": "A Concise Binary Object Representation (CBOR)-based Serialization Format for the Software Updates for Internet of Things (SUIT) Manifest",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "B. Moran",
            "isEditor": false
          },
          {
            "titlepageName": "H. Tschofenig",
            "isEditor": false
          },
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          },
          {
            "titlepageName": "K. Zandberg",
            "isEditor": false
          },
          {
            "titlepageName": "Ø. Rønningstad",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [535],
        "assignmentsByRoles": [],
        "pages": 101,
        "enqueuedAtIso": "2025-02-25T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-radext-reverse-coa",
        "title": "Reverse Change-of-Authorization (CoA) in RADIUS/(D)TLS",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. DeKok",
            "isEditor": false
          },
          {
            "titlepageName": "V. Cargatser",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [552],
        "assignmentsByRoles": [],
        "pages": 16,
        "enqueuedAtIso": "2025-08-28T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-oauth-browser-based-apps",
        "title": "OAuth 2.0 for Browser-Based Applications",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. Parecki",
            "isEditor": false
          },
          {
            "titlepageName": "P. Ryck",
            "isEditor": false
          },
          {
            "titlepageName": "D. Waite",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [548],
        "assignmentsByRoles": [],
        "pages": 68,
        "enqueuedAtIso": "2025-07-08T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-i2nsf-nsf-monitoring-data-model",
        "title": "I2NSF NSF Monitoring Interface YANG Data Model",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Jeong",
            "isEditor": false
          },
          {
            "titlepageName": "P. Lingga",
            "isEditor": false
          },
          {
            "titlepageName": "S. Hares",
            "isEditor": false
          },
          {
            "titlepageName": "L. Xia",
            "isEditor": false
          },
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [405],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Author Input Required"
                }
              }
            ]
          }
        ],
        "pages": 99,
        "enqueuedAtIso": "2022-05-18T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-netconf-over-tls13",
        "title": "Updates to Using the NETCONF Protocol over Transport Layer Security (TLS) with Mutual X.509 Authentication",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Turner",
            "isEditor": false
          },
          {
            "titlepageName": "R. Housley",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [496],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 6,
        "enqueuedAtIso": "2024-01-19T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-netconf-over-tls13",
              "rfcNumber": 9918
            },
            "logMessage": "2026-01-16: questions sent to authors.\r\n2026-01-16: response received. no updates to the text needed.\r\n2026-01-20: additional updates received. updated files sent. AD approval requested.\r\n\r\n\r\nRPC Note: This document normatively references RFC-to-be 9846, so it will be published at the same time as or after that document.",
            "timeIso": "2026-01-16T18:43:54.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-bier-php",
        "title": "BIER Penultimate Hop Popping",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Z. Zhang",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [523],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 9,
        "enqueuedAtIso": "2024-12-06T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ccamp-layer1-types",
        "title": "Common YANG Data Types for Layer 1 Networks",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "H. Zheng",
            "isEditor": false
          },
          {
            "titlepageName": "I. Busi",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 55,
        "enqueuedAtIso": "2024-02-23T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-acme-integrations",
        "title": "ACME Integrations for Device Certificate Enrollment",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "O. Friel",
            "isEditor": false
          },
          {
            "titlepageName": "R. Barnes",
            "isEditor": false
          },
          {
            "titlepageName": "R. Shekh-Yusef",
            "isEditor": false
          },
          {
            "titlepageName": "M. Richardson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [484],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received (2nd Generation)"
                }
              }
            ]
          }
        ],
        "pages": 23,
        "enqueuedAtIso": "2023-07-14T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-emailcore-rfc5322bis",
        "title": "Internet Message Format",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Resnick",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [540],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference: First Edit Incomplete"
                }
              }
            ]
          }
        ],
        "pages": 59,
        "enqueuedAtIso": "2025-03-18T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-tls12-frozen",
        "title": "TLS 1.2 is in Feature Freeze",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Salz",
            "isEditor": false
          },
          {
            "titlepageName": "N. Aviram",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [430],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 6,
        "enqueuedAtIso": "2025-06-18T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-tls-tls12-frozen",
              "rfcNumber": 9851
            },
            "logMessage": "2026-01-05: Questions sent to the authors.\r\n2026-01-05: Author response received. \r\n2026-01-07: Document updated per author reply; updated files posted for review.\r\n\r\nRPC Note about publication: This document normatively references RFCs-to-be 9846. It will be published at the same time as RFC-to-be 9846.",
            "timeIso": "2026-01-05T21:46:27.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-anima-jws-voucher",
        "title": "JWS signed Voucher Artifacts for Bootstrapping Protocols",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Werner",
            "isEditor": false
          },
          {
            "titlepageName": "M. Richardson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [484],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 17,
        "enqueuedAtIso": "2025-01-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-uta-require-tls13",
        "title": "New Protocols Using TLS Must Require TLS 1.3",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Salz",
            "isEditor": false
          },
          {
            "titlepageName": "N. Aviram",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [430],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 8,
        "enqueuedAtIso": "2025-06-25T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-uta-require-tls13",
              "rfcNumber": 9852
            },
            "logMessage": "2026-01-06: Sent questions to authors. Question #1 about BCP number assignment for both authors and AD.\r\n2026-01-06: Received reply.\r\n2026-01-06: Posted updated files. Sent one followup question.\r\n2026-01-07: Received reply.\r\n2026-01-07: Posted updated files and requested author approvals. All questions addressed except for question #1 (waiting for input from AD).\r\n2026-01-07: Received AD approval of question #1.\r\n\r\n\r\nRPC Note about publication: This document normatively references RFCs-to-be 9846 and 9851. It will be published at the same time as those documents.",
            "timeIso": "2026-01-06T18:57:46.000+00:00"
          }
        ]
      },
      {
        "name": "draft-briscoe-docsis-q-protection",
        "title": "The DOCSIS(r) Queue Protection Algorithm to Preserve Low Latency",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "B. Briscoe",
            "isEditor": true
          },
          {
            "titlepageName": "G. White",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [350],
        "assignmentsByRoles": [],
        "pages": 32,
        "enqueuedAtIso": "2022-05-11T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-emailcore-rfc5321bis",
        "title": "Simple Mail Transfer Protocol",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Klensin",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [540],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 124,
        "enqueuedAtIso": "2025-03-18T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-cose-merkle-tree-proofs",
        "title": "COSE (CBOR Object Signing and Encryption) Receipts",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "O. Steele",
            "isEditor": false
          },
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          },
          {
            "titlepageName": "A. Delignat-Lavaud",
            "isEditor": false
          },
          {
            "titlepageName": "C. Fournet",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [557],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 22,
        "enqueuedAtIso": "2025-09-10T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-cose-merkle-tree-proofs",
              "rfcNumber": 9942
            },
            "logMessage": "2026-03-06: document-specific and cluster-wide questions sent to authors.\r\n2026-04-01: some follow-up questions related to the cluster-wide questions sent (doc-specific questions have yet to be resolved).",
            "timeIso": "2026-03-06T23:48:32.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-lamps-rfc5019bis",
        "title": "Updates to Lightweight OCSP Profile for High Volume Environments",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Ito",
            "isEditor": false
          },
          {
            "titlepageName": "C. Wilson",
            "isEditor": false
          },
          {
            "titlepageName": "C. Bonnell",
            "isEditor": false
          },
          {
            "titlepageName": "S. Turner",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [496],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 36,
        "enqueuedAtIso": "2024-09-13T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-lamps-rfc5019bis",
              "rfcNumber": 9919
            },
            "logMessage": "2026-01-16: questions sent to authors.\r\n2026-01-20: response received. updated files sent. 2 questions remain.\r\n2026-01-21: final 2 questions addressed. updated files sent. \r\n2026-01-22: additional updates received. updated files sent. AD approval requested.\r\n2026-01-30: reminder sent.\r\n\r\n\r\nRPC Note: This document normatively references RFC-to-be 9846, so it will be published at the same time as or after that document.",
            "timeIso": "2026-01-16T18:45:22.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-tcpm-accurate-ecn",
        "title": "More Accurate Explicit Congestion Notification (AccECN) Feedback in TCP",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "B. Briscoe",
            "isEditor": false
          },
          {
            "titlepageName": "M. Kühlewind",
            "isEditor": false
          },
          {
            "titlepageName": "R. Scheffenegger",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [405],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Unresolved Action Holder"
                }
              }
            ]
          }
        ],
        "pages": 73,
        "enqueuedAtIso": "2025-03-17T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-tcpm-accurate-ecn",
              "rfcNumber": 9768
            },
            "logMessage": "2025-08-12: questions sent to the authors\r\n2025-08-14: author response received\r\n2025-08-15: updated files posted for review.  A couple of followup questions sent.\r\n2025-08-22: reminder sent to Mirja and Bob.\r\n2025-09-02: response received. \r\n2025-09-03: followup question sent. \r\n2025-09-12: updated files posted for review and followups sent.\r\n2025-09-15: author response received.\r\n2025-09-15: followup question sent. \r\n2025-09-26: reminder sent. \r\n2025-10-02: reminder sent.\r\n2025-11-03: Added Gorry Fairhurst as an approver because the WG is discussing a potential change to the document (includes a change to SHOULD)\r\n2025-11-08: updates requested; they do not address the changes Gorry mentioned previously. \r\n2025-11-11: updated files posted for review.  Cleared all approvals because there are open issues for each of the authors to review.\r\n2025-11-17: ongoing discussion about how \"AccECN\" should be introduced.  Needs further input from the authors. \r\n2025-12-10: asked authors for more input regarding \"AccECN\"\r\n2025-12-17: Gorry provided input regarding the expansion of \"AccECN\"\r\n2025-12-18: files updated and posted for review\r\n2026-01-14: reminder sent \r\n2026-01-21: reminder sent\r\n2026-01-30: reminder sent\r\n2026-02-13: reminder sent\r\n2026-03-03: reminder sent\r\n2026-03-10: updates requested.\r\n2026-03-15: updated files posted.\r\n2026-03-16: updates requested.\r\n2026-03-18: clarification provided.\r\n2026-03-27: confirmation that changes are ok.\r\n2026-04-03: updated files posted.\r\n\r\n\r\n\r\n2026-03-16: updates from author received.",
            "timeIso": "2025-08-12T19:31:33.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-teas-applicability-actn-slicing",
        "title": "Applicability of Abstraction and Control of Traffic Engineered Networks (ACTN) to IETF Network Slicing",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. King",
            "isEditor": false
          },
          {
            "titlepageName": "J. Drake",
            "isEditor": false
          },
          {
            "titlepageName": "H. Zheng",
            "isEditor": false
          },
          {
            "titlepageName": "A. Farrel",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 25,
        "enqueuedAtIso": "2024-08-28T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pce-pceps-tls13",
        "title": "Updates for PCEPS: TLS Connection Establishment Restrictions",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Dhody",
            "isEditor": false
          },
          {
            "titlepageName": "S. Turner",
            "isEditor": false
          },
          {
            "titlepageName": "R. Housley",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [496],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 6,
        "enqueuedAtIso": "2024-01-09T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-pce-pceps-tls13",
              "rfcNumber": 9916
            },
            "logMessage": "2026-01-16: questions sent to authors.\r\n2026-01-16: response received. updated files sent. \r\n2026-01-20: additional update received. updated files sent. \r\n\r\n\r\n\r\nRPC Note: This document normatively references RFC-to-be 9846, so it will be published at the same time as or after that document.",
            "timeIso": "2026-01-16T18:41:20.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-raw-technologies",
        "title": "Reliable and Available Wireless (RAW) Technologies",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Thubert",
            "isEditor": true
          },
          {
            "titlepageName": "D. Cavalcanti",
            "isEditor": false
          },
          {
            "titlepageName": "X. Vilajosana",
            "isEditor": false
          },
          {
            "titlepageName": "C. Schmitt",
            "isEditor": false
          },
          {
            "titlepageName": "J. Farkas",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [538],
        "assignmentsByRoles": [
          {
            "role": "publisher"
          }
        ],
        "pages": 66,
        "enqueuedAtIso": "2025-04-22T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-raw-technologies",
              "rfcNumber": 9913
            },
            "logMessage": "2026-02-09: Sent questions to authors.\r\n2026-02-18: Received author responses to the majority of questions. Sent updated files.\r\n2026-02-18: Received remaining responses. All questions addressed.\r\n2026-02-19: Sent updated files. Pending response to one follow-up question.\r\n2026-02-20: Received all author approvals and responses to questions.\r\n\r\nRPC Note: This document will be published as the same time as RFCs-to-be 9912 and 9914 (all cluster 538).",
            "timeIso": "2026-02-10T05:59:35.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-teas-ietf-network-slice-nbi-yang",
        "title": "A YANG Data Model for the RFC 9543 Network Slice Service",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "B. Wu",
            "isEditor": false
          },
          {
            "titlepageName": "D. Dhody",
            "isEditor": false
          },
          {
            "titlepageName": "R. Rokui",
            "isEditor": false
          },
          {
            "titlepageName": "T. Saad",
            "isEditor": false
          },
          {
            "titlepageName": "J. Mullooly",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 126,
        "enqueuedAtIso": "2025-05-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-8773bis",
        "title": "TLS 1.3 Extension for Using Certificates with an External Pre-Shared Key",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Housley",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [430],
        "assignmentsByRoles": [
          {
            "role": "second_editor"
          }
        ],
        "pages": 16,
        "enqueuedAtIso": "2025-09-04T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-i2nsf-capability-data-model",
        "title": "I2NSF Capability YANG Data Model",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Hares",
            "isEditor": true
          },
          {
            "titlepageName": "J. Jeong",
            "isEditor": true
          },
          {
            "titlepageName": "J. Kim",
            "isEditor": false
          },
          {
            "titlepageName": "R. Moskowitz",
            "isEditor": false
          },
          {
            "titlepageName": "Q. Lin",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [405],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Author Input Required"
                }
              }
            ]
          }
        ],
        "pages": 73,
        "enqueuedAtIso": "2022-05-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-anima-brski-cloud",
        "title": "Bootstrapping Remote Secure Key Infrastructure (BRSKI) Cloud Registrar",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "O. Friel",
            "isEditor": false
          },
          {
            "titlepageName": "R. Shekh-Yusef",
            "isEditor": false
          },
          {
            "titlepageName": "M. Richardson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [484],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 32,
        "enqueuedAtIso": "2025-09-10T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-i2nsf-registration-interface-dm",
        "title": "I2NSF Registration Interface YANG Data Model for NSF Capability Registration",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Hyun",
            "isEditor": true
          },
          {
            "titlepageName": "J. Jeong",
            "isEditor": true
          },
          {
            "titlepageName": "T. Roh",
            "isEditor": false
          },
          {
            "titlepageName": "S. Wi",
            "isEditor": false
          },
          {
            "titlepageName": "J. Park",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [405],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Author Input Required"
                }
              }
            ]
          }
        ],
        "pages": 36,
        "enqueuedAtIso": "2023-05-10T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tsvwg-nqb",
        "title": "A Non-Queue-Building Per-Hop Behavior (NQB PHB) for Differentiated Services",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "G. White",
            "isEditor": false
          },
          {
            "titlepageName": "T. Fossati",
            "isEditor": false
          },
          {
            "titlepageName": "R. Geib",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [350],
        "assignmentsByRoles": [],
        "pages": 40,
        "enqueuedAtIso": "2025-09-17T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-i2nsf-nsf-facing-interface-dm",
        "title": "I2NSF Network Security Function-Facing Interface YANG Data Model",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Kim",
            "isEditor": true
          },
          {
            "titlepageName": "J. Jeong",
            "isEditor": true
          },
          {
            "titlepageName": "J. Park",
            "isEditor": false
          },
          {
            "titlepageName": "S. Hares",
            "isEditor": false
          },
          {
            "titlepageName": "Q. Lin",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [405],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference: First Edit Incomplete"
                }
              }
            ]
          }
        ],
        "pages": 81,
        "enqueuedAtIso": "2022-05-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-dmarc-dmarcbis",
        "title": "Domain-based Message Authentication, Reporting, and Conformance (DMARC)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Herr",
            "isEditor": true
          },
          {
            "titlepageName": "J. Levine",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [539],
        "assignmentsByRoles": [],
        "pages": 82,
        "enqueuedAtIso": "2025-03-18T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pquip-hybrid-signature-spectrums",
        "title": "Hybrid signature spectrums",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "N. Bindel",
            "isEditor": false
          },
          {
            "titlepageName": "B. Hale",
            "isEditor": false
          },
          {
            "titlepageName": "D. Connolly",
            "isEditor": false
          },
          {
            "titlepageName": "F. Driscoll",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [553],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 28,
        "enqueuedAtIso": "2025-09-09T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-pquip-hybrid-signature-spectrums",
              "rfcNumber": 9955
            },
            "logMessage": "2026-04-03: Questions sent to authors.",
            "timeIso": "2026-04-03T16:48:37.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-teep-otrp-over-http",
        "title": "HTTP Transport for Trusted Execution Environment Provisioning: Agent Initiated Communication",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Thaler",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [480],
        "assignmentsByRoles": [],
        "pages": 14,
        "enqueuedAtIso": "2023-05-17T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-suit-mud",
        "title": "Strong Assertions of IoT Network Access Requirements",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "B. Moran",
            "isEditor": false
          },
          {
            "titlepageName": "H. Tschofenig",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [535],
        "assignmentsByRoles": [],
        "pages": 11,
        "enqueuedAtIso": "2025-02-25T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-sshm-ntruprime-ssh",
        "title": "Secure Shell (SSH) Key Exchange Method Using Hybrid Streamlined NTRU Prime sntrup761 and X25519 with SHA-512: sntrup761x25519-sha512",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "M. Friedl",
            "isEditor": false
          },
          {
            "titlepageName": "J. Mojzis",
            "isEditor": false
          },
          {
            "titlepageName": "S. Josefsson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Unresolved Action Holder"
                }
              }
            ]
          }
        ],
        "pages": 11,
        "enqueuedAtIso": "2025-09-30T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-sshm-ntruprime-ssh",
              "rfcNumber": 9941
            },
            "logMessage": "2026-03-06: Questions sent to authors.\r\n2026-03-07: Received author and AD feedback on one reference update; posted updated files with requested reference update.\r\n2026-03-16: Sent reminder.\r\n2026-03-24: Sent reminder.\r\n2026-03-30: Sent reminder.\r\n2026-04-01: Received author response.",
            "timeIso": "2026-03-07T03:12:35.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-opsawg-ipfix-on-path-telemetry",
        "title": "Export of Delay Performance Metrics in IP Flow Information eXport (IPFIX)",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "T. Graf",
            "isEditor": false
          },
          {
            "titlepageName": "B. Claise",
            "isEditor": false
          },
          {
            "titlepageName": "A. Huang-Feng",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Unresolved Action Holder"
                }
              }
            ]
          }
        ],
        "pages": 33,
        "enqueuedAtIso": "2025-10-01T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-opsawg-ipfix-on-path-telemetry",
              "rfcNumber": 9951
            },
            "logMessage": "2026-03-30: questions sent to authors. and notification sent to IANA.\r\n\r\nFrom IANA, Oct. 2025: \"After discussion with the authors, we will hold off on performing the IANA actions for this document until the RFC number is assigned.\"",
            "timeIso": "2026-03-31T05:46:21.000+00:00"
          }
        ]
      },
      {
        "name": "draft-farinacci-lisp-decent",
        "title": "A Decent LISP Mapping System (LISP-Decent)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Farinacci",
            "isEditor": false
          },
          {
            "titlepageName": "C. Cantrell",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 20,
        "enqueuedAtIso": "2025-10-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-cose-dilithium",
        "title": "ML-DSA for JOSE and COSE",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Prorock",
            "isEditor": false
          },
          {
            "titlepageName": "O. Steele",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 17,
        "enqueuedAtIso": "2025-10-15T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-scim-events",
        "title": "SCIM Profile for Security Event Tokens",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Hunt",
            "isEditor": true
          },
          {
            "titlepageName": "N. Cam-Winget",
            "isEditor": false
          },
          {
            "titlepageName": "M. Kiser",
            "isEditor": false
          },
          {
            "titlepageName": "J. Schreiber",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 38,
        "enqueuedAtIso": "2025-10-21T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-cose-hash-envelope",
        "title": "COSE Hash Envelope",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "O. Steele",
            "isEditor": false
          },
          {
            "titlepageName": "S. Lasker",
            "isEditor": false
          },
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 11,
        "enqueuedAtIso": "2025-10-27T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-stir-rfc4916-update",
        "title": "Connected Identity for STIR",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Peterson",
            "isEditor": false
          },
          {
            "titlepageName": "C. Wendt",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 15,
        "enqueuedAtIso": "2025-10-31T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-iab-nemops-workshop-report",
        "title": "Report from the IAB Workshop on the Next Era of Network Management Operations (NEMOPS)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "W. Hardaker",
            "isEditor": false
          },
          {
            "titlepageName": "D. Dhody",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 25,
        "enqueuedAtIso": "2025-11-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-iab-ai-control-report",
        "title": "IAB AI-CONTROL Workshop Report",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Nottingham",
            "isEditor": false
          },
          {
            "titlepageName": "S. Krishnan",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 13,
        "enqueuedAtIso": "2025-11-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-bmwg-mlrsearch",
        "title": "Multiple Loss Ratio Search",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Konstantynowicz",
            "isEditor": false
          },
          {
            "titlepageName": "V. Polák",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 79,
        "enqueuedAtIso": "2025-11-05T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-bfd-stability",
        "title": "BFD Stability",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. Mishra",
            "isEditor": false
          },
          {
            "titlepageName": "M. Jethanandani",
            "isEditor": false
          },
          {
            "titlepageName": "A. Saxena",
            "isEditor": false
          },
          {
            "titlepageName": "S. Pallagatti",
            "isEditor": false
          },
          {
            "titlepageName": "M. Chen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 23,
        "enqueuedAtIso": "2025-11-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-httpbis-safe-method-w-body",
        "title": "The HTTP QUERY Method",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Reschke",
            "isEditor": false
          },
          {
            "titlepageName": "J. Snell",
            "isEditor": false
          },
          {
            "titlepageName": "M. Bishop",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 32,
        "enqueuedAtIso": "2025-11-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ntp-over-ptp",
        "title": "NTP Over PTP",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Lichvar",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 14,
        "enqueuedAtIso": "2025-11-17T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-dispatch-mime-protobuf",
        "title": "Media Type Registration for Protocol Buffers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Kucherawy",
            "isEditor": true
          },
          {
            "titlepageName": "W. Kumari",
            "isEditor": false
          },
          {
            "titlepageName": "R. Sloan",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 10,
        "enqueuedAtIso": "2025-11-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-tls13-pkcs1",
        "title": "Legacy RSASSA-PKCS1-v1_5 codepoints for TLS 1.3",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Benjamin",
            "isEditor": false
          },
          {
            "titlepageName": "A. Popov",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 7,
        "enqueuedAtIso": "2025-12-02T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-bier-oam-requirements",
        "title": "Operations, Administration and Maintenance (OAM) Requirements for Bit Index Explicit Replication (BIER) Layer",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "G. Mirsky",
            "isEditor": true
          },
          {
            "titlepageName": "N. Kumar",
            "isEditor": false
          },
          {
            "titlepageName": "M. Chen",
            "isEditor": false
          },
          {
            "titlepageName": "S. Pallagatti",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 10,
        "enqueuedAtIso": "2025-12-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-rats-msg-wrap",
        "title": "RATS Conceptual Messages Wrapper (CMW)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          },
          {
            "titlepageName": "N. Smith",
            "isEditor": false
          },
          {
            "titlepageName": "T. Fossati",
            "isEditor": false
          },
          {
            "titlepageName": "H. Tschofenig",
            "isEditor": false
          },
          {
            "titlepageName": "D. Glaze",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 41,
        "enqueuedAtIso": "2025-12-08T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-grow-bmp-bgp-rib-stats",
        "title": "Advanced BGP Monitoring Protocol (BMP) Statistics Types",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Srivastava",
            "isEditor": true
          },
          {
            "titlepageName": "Y. Liu",
            "isEditor": false
          },
          {
            "titlepageName": "C. Lin",
            "isEditor": true
          },
          {
            "titlepageName": "J. Li",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 18,
        "enqueuedAtIso": "2025-12-09T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-dnsop-cds-consistency",
        "title": "Clarifications on CDS/CDNSKEY and CSYNC Consistency",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Thomassen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 16,
        "enqueuedAtIso": "2025-12-11T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-opsawg-prefix-lengths",
        "title": "Publishing End-Site Prefix Lengths",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "O. Gasser",
            "isEditor": false
          },
          {
            "titlepageName": "R. Bush",
            "isEditor": false
          },
          {
            "titlepageName": "M. Candela",
            "isEditor": false
          },
          {
            "titlepageName": "R. Housley",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 31,
        "enqueuedAtIso": "2025-12-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-mailmaint-messageflag-mailboxattribute",
        "title": "Registration of further IMAP/JMAP keywords and mailbox name attributes",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Jenkins",
            "isEditor": false
          },
          {
            "titlepageName": "D. Eggert",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 23,
        "enqueuedAtIso": "2025-12-18T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-idr-link-bandwidth",
        "title": "BGP Link Bandwidth Extended Community",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Mohapatra",
            "isEditor": false
          },
          {
            "titlepageName": "R. Das",
            "isEditor": true
          },
          {
            "titlepageName": "S. Mohanty",
            "isEditor": true
          },
          {
            "titlepageName": "S. Krier",
            "isEditor": false
          },
          {
            "titlepageName": "R. Szarecki",
            "isEditor": false
          },
          {
            "titlepageName": "A. Gattani",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 12,
        "enqueuedAtIso": "2025-12-22T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-asap-sip-auto-peer",
        "title": "Automatic Peering for SIP Trunks",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "K. Inamdar",
            "isEditor": false
          },
          {
            "titlepageName": "S. Narayanan",
            "isEditor": false
          },
          {
            "titlepageName": "C. Jennings",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 60,
        "enqueuedAtIso": "2026-01-05T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-openpgp-pqc",
        "title": "Post-Quantum Cryptography in OpenPGP",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Kousidis",
            "isEditor": false
          },
          {
            "titlepageName": "J. Roth",
            "isEditor": false
          },
          {
            "titlepageName": "F. Strenzke",
            "isEditor": false
          },
          {
            "titlepageName": "A. Wussler",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 271,
        "enqueuedAtIso": "2026-01-06T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lamps-keyusage-crl-validation",
        "title": "Clarification to Processing Key Usage Values During Certificate Revocation List (CRL) Validation",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "C. Bonnell",
            "isEditor": false
          },
          {
            "titlepageName": "T. Ito",
            "isEditor": false
          },
          {
            "titlepageName": "T. Okubo",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 6,
        "enqueuedAtIso": "2026-01-07T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-rift-kv-tie-structure-and-processing",
        "title": "Routing in Fat Trees (RIFT) Key/Value Topology Information Elements Structure and Processing",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Head",
            "isEditor": true
          },
          {
            "titlepageName": "T. Przygienda",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 13,
        "enqueuedAtIso": "2026-01-07T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-calext-jscontact-uid",
        "title": "JSContact Version 2.0: A JSON Representation of Contact Data",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Stepanek",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 7,
        "enqueuedAtIso": "2026-01-09T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-sidrops-manifest-numbers",
        "title": "Resource Public Key Infrastructure (RPKI) Manifest Number Handling",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Harrison",
            "isEditor": false
          },
          {
            "titlepageName": "G. Michaelson",
            "isEditor": false
          },
          {
            "titlepageName": "J. Snijders",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 9,
        "enqueuedAtIso": "2026-01-13T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-avtcore-rtp-haptics",
        "title": "RTP Payload Format for Haptics",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "H. Yang",
            "isEditor": false
          },
          {
            "titlepageName": "X. Foy",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 24,
        "enqueuedAtIso": "2026-01-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-core-yang-sid-pen",
        "title": "YANG-CBOR: Allocating SID ranges for PEN holders",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "C. Bormann",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 8,
        "enqueuedAtIso": "2026-01-22T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lsr-anycast-flag",
        "title": "OSPFv2 Anycast Property Advertisement",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Chen",
            "isEditor": false
          },
          {
            "titlepageName": "D. Zhao",
            "isEditor": false
          },
          {
            "titlepageName": "P. Psenak",
            "isEditor": false
          },
          {
            "titlepageName": "K. Talaulikar",
            "isEditor": false
          },
          {
            "titlepageName": "C. Lin",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 12,
        "enqueuedAtIso": "2026-01-26T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-netmod-system-config",
        "title": "System-defined Configuration",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Q. Ma",
            "isEditor": true
          },
          {
            "titlepageName": "Q. Wu",
            "isEditor": false
          },
          {
            "titlepageName": "C. Feng",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 33,
        "enqueuedAtIso": "2026-01-26T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-cats-usecases-requirements",
        "title": "Computing-Aware Traffic Steering (CATS) Problem Statement, Use Cases, and Requirements",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "K. Yao",
            "isEditor": false
          },
          {
            "titlepageName": "L. Contreras",
            "isEditor": false
          },
          {
            "titlepageName": "H. Shi",
            "isEditor": false
          },
          {
            "titlepageName": "S. Zhang",
            "isEditor": false
          },
          {
            "titlepageName": "Q. An",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 35,
        "enqueuedAtIso": "2026-01-28T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-netconf-restconf-client-server",
        "title": "A YANG Data Model for RESTCONF Clients and Servers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "K. Watsen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [463],
        "assignmentsByRoles": [],
        "pages": 62,
        "enqueuedAtIso": "2025-11-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-deprecate-obsolete-kex",
        "title": "Deprecating Obsolete Key Exchange Methods in (D)TLS 1.2",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Aviram",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [430],
        "assignmentsByRoles": [],
        "pages": 23,
        "enqueuedAtIso": "2026-01-06T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pim-p2mp-policy-ping",
        "title": "Segment Routing MPLS Point-to-Multipoint (P2MP) Policy Ping",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "H. Bidgoli",
            "isEditor": true
          },
          {
            "titlepageName": "Z. Ali",
            "isEditor": false
          },
          {
            "titlepageName": "Z. Zhang",
            "isEditor": false
          },
          {
            "titlepageName": "A. Budhiraja",
            "isEditor": false
          },
          {
            "titlepageName": "D. Voyer",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [556],
        "assignmentsByRoles": [],
        "pages": 11,
        "enqueuedAtIso": "2025-09-24T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ccamp-rfc9093-bis",
        "title": "Common YANG Data Types for Layer 0 Optical Networks",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Belotti",
            "isEditor": true
          },
          {
            "titlepageName": "I. Busi",
            "isEditor": true
          },
          {
            "titlepageName": "D. Beller",
            "isEditor": true
          },
          {
            "titlepageName": "E. Le Rouzic",
            "isEditor": false
          },
          {
            "titlepageName": "A. Guo",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 80,
        "enqueuedAtIso": "2025-10-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-httpbis-rfc6265bis",
        "title": "Cookies: HTTP State Management Mechanism",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Bingler",
            "isEditor": true
          },
          {
            "titlepageName": "M. West",
            "isEditor": true
          },
          {
            "titlepageName": "J. Wilander",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [548],
        "assignmentsByRoles": [],
        "pages": 62,
        "enqueuedAtIso": "2025-12-02T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-6man-icmpv6-reflection",
        "title": "Internet Control Message Protocol (ICMPv6) Reflection",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Mizrahi",
            "isEditor": false
          },
          {
            "titlepageName": "X. He",
            "isEditor": false
          },
          {
            "titlepageName": "T. Zhou",
            "isEditor": false
          },
          {
            "titlepageName": "R. Bonica",
            "isEditor": false
          },
          {
            "titlepageName": "X. Min",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [563],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 14,
        "enqueuedAtIso": "2025-12-29T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pim-sr-p2mp-policy",
        "title": "Segment Routing Point-to-Multipoint Policy",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Parekh",
            "isEditor": true
          },
          {
            "titlepageName": "D. Voyer",
            "isEditor": true
          },
          {
            "titlepageName": "C. Filsfils",
            "isEditor": false
          },
          {
            "titlepageName": "H. Bidgoli",
            "isEditor": false
          },
          {
            "titlepageName": "Z. Zhang",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [556],
        "assignmentsByRoles": [],
        "pages": 27,
        "enqueuedAtIso": "2025-09-24T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pce-sid-algo",
        "title": "Carrying SR-Algorithm in Path Computation Element Communication Protocol (PCEP)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Sidor",
            "isEditor": false
          },
          {
            "titlepageName": "Z. Rose",
            "isEditor": false
          },
          {
            "titlepageName": "S. Peng",
            "isEditor": false
          },
          {
            "titlepageName": "S. Peng",
            "isEditor": false
          },
          {
            "titlepageName": "A. Stone",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [496],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 33,
        "enqueuedAtIso": "2025-10-17T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-pce-sid-algo",
              "rfcNumber": 9933
            },
            "logMessage": "2026-02-19: questions sent to authors.\r\n2026-02-20: response received.\r\n2026-02-23: updated files sent. 1 follow-up question.\r\n2026-02-24: response received. updated files sent. \r\n2026-02-27: IANA updates requested.\r\n\r\n\r\nRPC Note: This document normatively references RFC-to-be 9916, so it will be published at the same time as or after that document.",
            "timeIso": "2026-02-20T00:21:30.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-bfd-optimizing-authentication",
        "title": "Optimizing BFD Authentication",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Jethanandani",
            "isEditor": false
          },
          {
            "titlepageName": "A. Mishra",
            "isEditor": false
          },
          {
            "titlepageName": "J. Haas",
            "isEditor": false
          },
          {
            "titlepageName": "A. Saxena",
            "isEditor": false
          },
          {
            "titlepageName": "M. Bhatia",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [562],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 24,
        "enqueuedAtIso": "2025-11-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-emu-bootstrapped-tls",
        "title": "Bootstrapped TLS Authentication with Proof of Knowledge (TLS-POK)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "O. Friel",
            "isEditor": false
          },
          {
            "titlepageName": "D. Harkins",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [558],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 16,
        "enqueuedAtIso": "2025-10-01T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-emu-eap-arpa",
        "title": "The eap.arpa. domain and EAP provisioning",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. DeKok",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [558],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 26,
        "enqueuedAtIso": "2025-09-26T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-suit-report",
        "title": "Secure Reporting of SUIT Update Status",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "B. Moran",
            "isEditor": false
          },
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [535],
        "assignmentsByRoles": [],
        "pages": 30,
        "enqueuedAtIso": "2025-12-09T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-core-href",
        "title": "Constrained Resource Identifiers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "C. Bormann",
            "isEditor": true
          },
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [561],
        "assignmentsByRoles": [],
        "pages": 58,
        "enqueuedAtIso": "2025-11-06T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-scitt-architecture",
        "title": "An Architecture for Trustworthy and Transparent Digital Supply Chains",
        "consensus": false,
        "authors": [
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          },
          {
            "titlepageName": "A. Delignat-Lavaud",
            "isEditor": false
          },
          {
            "titlepageName": "C. Fournet",
            "isEditor": false
          },
          {
            "titlepageName": "Y. Deshpande",
            "isEditor": false
          },
          {
            "titlepageName": "S. Lasker",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [557],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 41,
        "enqueuedAtIso": "2025-10-01T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-scitt-architecture",
              "rfcNumber": 9943
            },
            "logMessage": "2026-03-06: document-specific and cluster-wide questions sent to authors.\r\n2026-04-01: follow-up questions related to the doc-specific questions sent (we believe any follow-ups sent for the cluster-wide questions were related to the companion document). NOTE: updates to two SVG figures are necessary prior to publication (To Be Signed --\u003E To-Be-Signed and 3rd-party --\u003Ethird-party) updates to the spaces attribute for SVG may help with selectability/searchability of SVG figures when regenerating.",
            "timeIso": "2026-03-06T23:48:35.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-netconf-netconf-client-server",
        "title": "A YANG Data Model for NETCONF Clients and Servers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "K. Watsen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [463],
        "assignmentsByRoles": [],
        "pages": 65,
        "enqueuedAtIso": "2025-11-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-netconf-udp-client-server",
        "title": "YANG Groupings for UDP Clients and UDP Servers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. Huang-Feng",
            "isEditor": false
          },
          {
            "titlepageName": "P. Francois",
            "isEditor": false
          },
          {
            "titlepageName": "K. Watsen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [463],
        "assignmentsByRoles": [],
        "pages": 15,
        "enqueuedAtIso": "2025-12-19T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-dmarc-failure-reporting",
        "title": "Domain-based Message Authentication, Reporting, and Conformance (DMARC) Failure Reporting",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Jones",
            "isEditor": false
          },
          {
            "titlepageName": "A. Vesely",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [539],
        "assignmentsByRoles": [],
        "pages": 19,
        "enqueuedAtIso": "2026-01-09T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-bfd-secure-sequence-numbers",
        "title": "Meticulous Keyed ISAAC for BFD Optimized Authentication",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. DeKok",
            "isEditor": false
          },
          {
            "titlepageName": "M. Jethanandani",
            "isEditor": false
          },
          {
            "titlepageName": "S. Agarwal",
            "isEditor": false
          },
          {
            "titlepageName": "A. Mishra",
            "isEditor": false
          },
          {
            "titlepageName": "J. Haas",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [562],
        "assignmentsByRoles": [
          {
            "role": "first_editor"
          }
        ],
        "pages": 34,
        "enqueuedAtIso": "2025-11-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-bess-mvpn-evpn-sr-p2mp",
        "title": "Multicast and Ethernet VPN with Segment Routing P2MP and Ingress Replication",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Parekh",
            "isEditor": true
          },
          {
            "titlepageName": "D. Voyer",
            "isEditor": true
          },
          {
            "titlepageName": "C. Filsfils",
            "isEditor": false
          },
          {
            "titlepageName": "H. Bidgoli",
            "isEditor": false
          },
          {
            "titlepageName": "Z. Zhang",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [556],
        "assignmentsByRoles": [],
        "pages": 26,
        "enqueuedAtIso": "2026-01-26T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-davids-forsalereg",
        "title": "The \"_for-sale\" Underscored and Globally Scoped DNS Node Name",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Davids",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 21,
        "enqueuedAtIso": "2026-02-05T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-dnsop-3901bis",
        "title": "Operational Guidelines for DNS Transport in Mixed IPv4/IPv6 Environments",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Yamamoto",
            "isEditor": false
          },
          {
            "titlepageName": "T. Fiebig",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 20,
        "enqueuedAtIso": "2026-02-13T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-rats-eat-measured-component",
        "title": "Entity Attestation Token (EAT) Measured Component",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Frost",
            "isEditor": false
          },
          {
            "titlepageName": "T. Fossati",
            "isEditor": false
          },
          {
            "titlepageName": "H. Tschofenig",
            "isEditor": false
          },
          {
            "titlepageName": "H. Birkholz",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 20,
        "enqueuedAtIso": "2026-02-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-sshm-ssh-agent",
        "title": "SSH Agent Protocol",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Miller",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 31,
        "enqueuedAtIso": "2026-02-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-mailmaint-imap-uidbatches",
        "title": "IMAP UIDBATCHES Extension",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Eggert",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 17,
        "enqueuedAtIso": "2026-02-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-sshm-mlkem-hybrid-kex",
        "title": "PQ/T Hybrid Key Exchange with ML-KEM in SSH",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Kampanakis",
            "isEditor": false
          },
          {
            "titlepageName": "D. Stebila",
            "isEditor": false
          },
          {
            "titlepageName": "T. Hansen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 15,
        "enqueuedAtIso": "2026-02-24T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-oauth-cross-device-security",
        "title": "Cross-Device Flows: Security Best Current Practice",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "P. Kasselman",
            "isEditor": false
          },
          {
            "titlepageName": "D. Fett",
            "isEditor": false
          },
          {
            "titlepageName": "F. Skokan",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 67,
        "enqueuedAtIso": "2026-02-24T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pim-zeroconf-mcast-addr-alloc-ps",
        "title": "Zeroconf Multicast Address Allocation Problem Statement and Requirements",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Karstens",
            "isEditor": false
          },
          {
            "titlepageName": "D. Farinacci",
            "isEditor": false
          },
          {
            "titlepageName": "M. McBride",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 11,
        "enqueuedAtIso": "2026-02-24T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-mpls-mna-hdr",
        "title": "MPLS Network Action (MNA) Sub-Stack Specification including In-Stack Network Actions and Data",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Rajamanickam",
            "isEditor": true
          },
          {
            "titlepageName": "R. Gandhi",
            "isEditor": true
          },
          {
            "titlepageName": "R. Zigler",
            "isEditor": false
          },
          {
            "titlepageName": "H. Song",
            "isEditor": false
          },
          {
            "titlepageName": "K. Kompella",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 33,
        "enqueuedAtIso": "2026-02-26T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-dnssd-multi-qtypes",
        "title": "DNS Multiple QTYPEs",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Bellis",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 13,
        "enqueuedAtIso": "2026-02-27T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-avtcore-rtp-v3c",
        "title": "RTP Payload Format for Visual Volumetric Video-based Coding (V3C)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "L. Ilola",
            "isEditor": false
          },
          {
            "titlepageName": "L. Kondrad",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 52,
        "enqueuedAtIso": "2026-02-27T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-netconf-yang-library-augmentedby",
        "title": "Augmented-by Addition to the YANG Library",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Z. Lin",
            "isEditor": false
          },
          {
            "titlepageName": "B. Claise",
            "isEditor": false
          },
          {
            "titlepageName": "I. Martinez-Casanueva",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [
          {
            "role": "formatting"
          },
          {
            "role": "enqueuer"
          }
        ],
        "pages": 27,
        "enqueuedAtIso": "2026-03-02T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-irtf-cfrg-aegis-aead",
        "title": "The AEGIS Family of Authenticated Encryption Algorithms",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "F. Denis",
            "isEditor": false
          },
          {
            "titlepageName": "S. Lucas",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 73,
        "enqueuedAtIso": "2026-03-02T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pquip-hbs-state",
        "title": "Hash-based Signatures: State and Backup Management",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Wiggers",
            "isEditor": false
          },
          {
            "titlepageName": "K. Bashiri",
            "isEditor": false
          },
          {
            "titlepageName": "S. Kölbl",
            "isEditor": false
          },
          {
            "titlepageName": "J. Goodman",
            "isEditor": false
          },
          {
            "titlepageName": "S. Kousidis",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 25,
        "enqueuedAtIso": "2026-03-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-spring-dhc-distribute-srv6-locator-dhcp",
        "title": "Distribute SRv6 Locator by DHCP",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "W. Cheng",
            "isEditor": true
          },
          {
            "titlepageName": "R. Han",
            "isEditor": false
          },
          {
            "titlepageName": "C. Lin",
            "isEditor": true
          },
          {
            "titlepageName": "D. Voyer",
            "isEditor": false
          },
          {
            "titlepageName": "G. Zhang",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 22,
        "enqueuedAtIso": "2026-03-06T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-bess-evpn-ipvpn-interworking",
        "title": "Interconnecting EVPN and IPVPN Domains",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Rabadan",
            "isEditor": true
          },
          {
            "titlepageName": "A. Sajassi",
            "isEditor": true
          },
          {
            "titlepageName": "E. Rosen",
            "isEditor": false
          },
          {
            "titlepageName": "J. Drake",
            "isEditor": false
          },
          {
            "titlepageName": "W. Lin",
            "isEditor": false
          },
          {
            "titlepageName": "J. Uttaro",
            "isEditor": false
          },
          {
            "titlepageName": "A. Simpson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 39,
        "enqueuedAtIso": "2026-03-09T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pim-updt-ipv6-dyn-mcast-addr-grp-id",
        "title": "Updates to Dynamic IPv6 Multicast Address Group IDs",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Karstens",
            "isEditor": false
          },
          {
            "titlepageName": "D. Farinacci",
            "isEditor": false
          },
          {
            "titlepageName": "M. McBride",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 7,
        "enqueuedAtIso": "2026-03-11T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lamps-macaddress-on",
        "title": "Media Access Control (MAC) Addresses in X.509 Certificates",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "R. Housley",
            "isEditor": false
          },
          {
            "titlepageName": "C. Bonnell",
            "isEditor": false
          },
          {
            "titlepageName": "J. Mandel",
            "isEditor": false
          },
          {
            "titlepageName": "T. Okubo",
            "isEditor": false
          },
          {
            "titlepageName": "M. StJohns",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 15,
        "enqueuedAtIso": "2026-03-13T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lsr-ospf-ls-link-infinity",
        "title": "Advertising Unreachable Links in OSPF",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "L. Gong",
            "isEditor": false
          },
          {
            "titlepageName": "W. Cheng",
            "isEditor": false
          },
          {
            "titlepageName": "C. Lin",
            "isEditor": false
          },
          {
            "titlepageName": "A. Lindem",
            "isEditor": false
          },
          {
            "titlepageName": "R. Chen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 28,
        "enqueuedAtIso": "2026-03-15T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lisp-geo",
        "title": "LISP Geo-Coordinates",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Farinacci",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 19,
        "enqueuedAtIso": "2026-03-15T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-calext-ical-tasks",
        "title": "Task Extensions to iCalendar",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. Apthorp",
            "isEditor": false
          },
          {
            "titlepageName": "M. Douglass",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 34,
        "enqueuedAtIso": "2026-03-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ntp-roughtime",
        "title": "Roughtime",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "W. Ladd",
            "isEditor": false
          },
          {
            "titlepageName": "M. Dansarie",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [],
        "pages": 33,
        "enqueuedAtIso": "2026-03-17T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-quic-multipath",
        "title": "Managing multiple paths for a QUIC connection",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Y. Liu",
            "isEditor": true
          },
          {
            "titlepageName": "Y. Ma",
            "isEditor": false
          },
          {
            "titlepageName": "Q. De Coninck",
            "isEditor": true
          },
          {
            "titlepageName": "O. Bonaventure",
            "isEditor": false
          },
          {
            "titlepageName": "C. Huitema",
            "isEditor": false
          },
          {
            "titlepageName": "M. Kühlewind",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "assignmentsByRoles": [],
        "pages": 42,
        "enqueuedAtIso": "2026-03-18T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-opsawg-ucl-acl",
        "title": "A YANG Data Model and RADIUS Extension for Policy-Based Network Access Control",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Q. Ma",
            "isEditor": true
          },
          {
            "titlepageName": "Q. Wu",
            "isEditor": false
          },
          {
            "titlepageName": "M. Boucadair",
            "isEditor": true
          },
          {
            "titlepageName": "D. King",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Author Input Required"
                }
              }
            ]
          }
        ],
        "pages": 43,
        "enqueuedAtIso": "2026-04-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-opsawg-pcaplinktype",
        "title": "Link-Layer Types for PCAP-related Capture File Formats",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "G. Harris",
            "isEditor": true
          },
          {
            "titlepageName": "M. Richardson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Author Input Required"
                }
              }
            ]
          }
        ],
        "pages": 38,
        "enqueuedAtIso": "2026-04-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-ecdhe-mlkem",
        "title": "Post-quantum hybrid ECDHE-MLKEM Key Agreement for TLSv1.3",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "K. Kwiatkowski",
            "isEditor": false
          },
          {
            "titlepageName": "P. Kampanakis",
            "isEditor": false
          },
          {
            "titlepageName": "B. Westerbaan",
            "isEditor": false
          },
          {
            "titlepageName": "D. Stebila",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [553],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 12,
        "enqueuedAtIso": "2026-02-11T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ohai-chunked-ohttp",
        "title": "Chunked Oblivious HTTP Messages",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Pauly",
            "isEditor": false
          },
          {
            "titlepageName": "M. Thomson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [567],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 18,
        "enqueuedAtIso": "2026-02-27T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-spring-cs-sr-policy",
        "title": "Circuit Style Segment Routing Policy",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "C. Schmutzer",
            "isEditor": true
          },
          {
            "titlepageName": "Z. Ali",
            "isEditor": true
          },
          {
            "titlepageName": "P. Maheshwari",
            "isEditor": false
          },
          {
            "titlepageName": "R. Rokui",
            "isEditor": false
          },
          {
            "titlepageName": "A. Stone",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [496],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 29,
        "enqueuedAtIso": "2026-03-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-core-groupcomm-bis",
        "title": "Group Communication for the Constrained Application Protocol (CoAP)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "E. Dijk",
            "isEditor": false
          },
          {
            "titlepageName": "M. Tiloca",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [564],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 117,
        "enqueuedAtIso": "2026-02-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-teep-protocol",
        "title": "Trusted Execution Environment Provisioning (TEEP) Protocol",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "H. Tschofenig",
            "isEditor": false
          },
          {
            "titlepageName": "M. Pei",
            "isEditor": false
          },
          {
            "titlepageName": "D. Wheeler",
            "isEditor": false
          },
          {
            "titlepageName": "D. Thaler",
            "isEditor": false
          },
          {
            "titlepageName": "A. Tsukamoto",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "Author Input Required",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [480],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Author Input Required"
                }
              },
              {
                "reason": {
                  "name": "Reference Not Received (2nd Generation)"
                }
              }
            ]
          }
        ],
        "pages": 89,
        "enqueuedAtIso": "2026-03-06T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lisp-te",
        "title": "LISP Traffic Engineering",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Farinacci",
            "isEditor": false
          },
          {
            "titlepageName": "M. Kowal",
            "isEditor": false
          },
          {
            "titlepageName": "P. Lahiri",
            "isEditor": false
          },
          {
            "titlepageName": "P. Pillay-Esnault",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [566],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 25,
        "enqueuedAtIso": "2026-02-17T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-teas-yang-te",
        "title": "A YANG Data Model for Traffic Engineering Tunnels, Label Switched Paths, and Interfaces",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "T. Saad",
            "isEditor": false
          },
          {
            "titlepageName": "R. Gandhi",
            "isEditor": false
          },
          {
            "titlepageName": "X. Liu",
            "isEditor": false
          },
          {
            "titlepageName": "V. Pavan Beeram",
            "isEditor": false
          },
          {
            "titlepageName": "I. Bryskin",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 120,
        "enqueuedAtIso": "2026-03-30T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ace-key-groupcomm-oscore",
        "title": "Key Management for Group Object Security for Constrained RESTful Environments (Group OSCORE) Using Authentication and Authorization for Constrained Environments (ACE)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Tiloca",
            "isEditor": false
          },
          {
            "titlepageName": "F. Palombini",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [564],
        "assignmentsByRoles": [],
        "pages": 129,
        "enqueuedAtIso": "2026-03-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-core-oscore-groupcomm",
        "title": "Group Object Security for Constrained RESTful Environments (Group OSCORE)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Tiloca",
            "isEditor": false
          },
          {
            "titlepageName": "G. Selander",
            "isEditor": false
          },
          {
            "titlepageName": "F. Palombini",
            "isEditor": false
          },
          {
            "titlepageName": "J. Preuß Mattsson",
            "isEditor": false
          },
          {
            "titlepageName": "R. Höglund",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [564],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 129,
        "enqueuedAtIso": "2026-02-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ace-oscore-gm-admin",
        "title": "Admin Interface for the OSCORE Group Manager",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Tiloca",
            "isEditor": false
          },
          {
            "titlepageName": "R. Höglund",
            "isEditor": false
          },
          {
            "titlepageName": "P. van der Stok",
            "isEditor": false
          },
          {
            "titlepageName": "F. Palombini",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [564],
        "assignmentsByRoles": [],
        "pages": 93,
        "enqueuedAtIso": "2026-03-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lamps-rfc5274bis",
        "title": "Certificate Management Messages over CMS (CMC): Compliance Requirements",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Mandel",
            "isEditor": false
          },
          {
            "titlepageName": "S. Turner",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [565],
        "assignmentsByRoles": [],
        "pages": 14,
        "enqueuedAtIso": "2026-02-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-bess-evpn-unequal-lb",
        "title": "Weighted Multi-Path Procedures for EVPN Multi-Homing",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Malhotra",
            "isEditor": true
          },
          {
            "titlepageName": "A. Sajassi",
            "isEditor": false
          },
          {
            "titlepageName": "J. Rabadan",
            "isEditor": false
          },
          {
            "titlepageName": "J. Drake",
            "isEditor": false
          },
          {
            "titlepageName": "A. Lingala",
            "isEditor": false
          },
          {
            "titlepageName": "S. Thoria",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [569],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 25,
        "enqueuedAtIso": "2026-03-15T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ccamp-optical-impairment-topology-yang",
        "title": "A YANG Data Model for Optical Impairment-aware Topology",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "D. Beller",
            "isEditor": true
          },
          {
            "titlepageName": "E. Le Rouzic",
            "isEditor": false
          },
          {
            "titlepageName": "S. Belotti",
            "isEditor": false
          },
          {
            "titlepageName": "G. Galimberti",
            "isEditor": false
          },
          {
            "titlepageName": "I. Busi",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [517],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 154,
        "enqueuedAtIso": "2026-03-15T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pce-circuit-style-pcep-extensions",
        "title": "Path Computation Element Communication Protocol (PCEP) extensions for Circuit Style Policies",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "S. Sidor",
            "isEditor": false
          },
          {
            "titlepageName": "P. Maheshwari",
            "isEditor": false
          },
          {
            "titlepageName": "A. Stone",
            "isEditor": false
          },
          {
            "titlepageName": "L. Jalil",
            "isEditor": false
          },
          {
            "titlepageName": "S. Peng",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [496],
        "assignmentsByRoles": [],
        "pages": 18,
        "enqueuedAtIso": "2026-03-16T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-pce-sr-bidir-path",
        "title": "Path Computation Element Communication Protocol (PCEP) Extensions for Associated Bidirectional Segment Routing (SR) LSPs",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "C. Li",
            "isEditor": true
          },
          {
            "titlepageName": "M. Chen",
            "isEditor": false
          },
          {
            "titlepageName": "W. Cheng",
            "isEditor": false
          },
          {
            "titlepageName": "R. Gandhi",
            "isEditor": true
          },
          {
            "titlepageName": "Q. Xiong",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [496],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 18,
        "enqueuedAtIso": "2026-03-09T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lamps-rfc5273bis",
        "title": "Certificate Management over CMS (CMC): Transport Protocols",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Mandel",
            "isEditor": false
          },
          {
            "titlepageName": "S. Turner",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [565],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 13,
        "enqueuedAtIso": "2026-02-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-httpbis-incremental",
        "title": "Incremental Forwarding of HTTP Messages",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "K. Oku",
            "isEditor": false
          },
          {
            "titlepageName": "T. Pauly",
            "isEditor": false
          },
          {
            "titlepageName": "M. Thomson",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [
          {
            "slug": "markdown",
            "themeColor": "amber",
            "isException": false,
            "isComplexity": false
          },
          {
            "slug": "github",
            "themeColor": "slate",
            "isException": false,
            "isComplexity": false
          }
        ],
        "clusters": [567],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 8,
        "enqueuedAtIso": "2026-03-02T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-v6ops-claton",
        "title": "464XLAT Customer-side Translator (CLAT): Node Behavior and Recommendations",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "L. Colitti",
            "isEditor": false
          },
          {
            "titlepageName": "J. Linkova",
            "isEditor": false
          },
          {
            "titlepageName": "T. Jensen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [525],
        "assignmentsByRoles": [],
        "pages": 25,
        "enqueuedAtIso": "2026-03-06T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-tls-keylogfile",
        "title": "The SSLKEYLOGFILE Format for TLS",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "M. Thomson",
            "isEditor": false
          },
          {
            "titlepageName": "Y. Rosomakho",
            "isEditor": false
          },
          {
            "titlepageName": "H. Tschofenig",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [430],
        "assignmentsByRoles": [
          {
            "role": "final_review_editor"
          }
        ],
        "pages": 15,
        "enqueuedAtIso": "2025-06-11T12:00:00.000Z",
        "approvalLogMessages": [
          {
            "rfcToBe": {
              "name": "draft-ietf-tls-keylogfile",
              "rfcNumber": 9850
            },
            "logMessage": "2025-12-16: Sent questions to authors.\r\n2025-12-16: Response received.\r\n2025-12-17: Updated files sent. \r\n2026-01-05: IANA updates requested.\r\n\r\nRPC Note: This document normatively references RFCs-to-be 9849 and 9846, so it will be published at the same time as or after those documents.",
            "timeIso": "2025-12-16T18:29:29.000+00:00"
          }
        ]
      },
      {
        "name": "draft-ietf-netconf-http-client-server",
        "title": "YANG Groupings for HTTP Clients and HTTP Servers",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "K. Watsen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [463],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 49,
        "enqueuedAtIso": "2025-11-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-6man-rfc6724-update",
        "title": "Prioritizing known-local IPv6 ULAs through address selection policy",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "N. Buraglio",
            "isEditor": false
          },
          {
            "titlepageName": "T. Chown",
            "isEditor": false
          },
          {
            "titlepageName": "J. Duncan",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [525],
        "assignmentsByRoles": [],
        "pages": 21,
        "enqueuedAtIso": "2025-09-03T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-lamps-rfc5272bis",
        "title": "Certificate Management over CMS (CMC)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "J. Mandel",
            "isEditor": true
          },
          {
            "titlepageName": "S. Turner",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [565],
        "assignmentsByRoles": [
          {
            "role": "ref_checker"
          }
        ],
        "pages": 109,
        "enqueuedAtIso": "2026-02-12T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-ippm-asymmetrical-pkts",
        "title": "Performance Measurement with Asymmetrical Traffic Using Simple Two-Way Active Measurement Protocol (STAMP)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "G. Mirsky",
            "isEditor": false
          },
          {
            "titlepageName": "E. Ruffini",
            "isEditor": false
          },
          {
            "titlepageName": "H. Nydell",
            "isEditor": false
          },
          {
            "titlepageName": "R. Foote",
            "isEditor": false
          },
          {
            "titlepageName": "W. Hawkins",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [570],
        "assignmentsByRoles": [],
        "pages": 20,
        "enqueuedAtIso": "2026-03-17T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-idr-bgpls-sr-vtn-mt",
        "title": "Applicability of Border Gateway Protocol - Link State (BGP-LS) with Multi-Topology (MT) for Segment Routing based Network Resource Partitions (NRPs)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "C. Xie",
            "isEditor": false
          },
          {
            "titlepageName": "C. Li",
            "isEditor": false
          },
          {
            "titlepageName": "J. Dong",
            "isEditor": false
          },
          {
            "titlepageName": "Z. Li",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [560],
        "assignmentsByRoles": [
          {
            "role": "blocked",
            "blockingReasons": [
              {
                "reason": {
                  "name": "Reference Not Received"
                }
              }
            ]
          }
        ],
        "pages": 10,
        "enqueuedAtIso": "2025-10-20T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-dmarc-aggregate-reporting",
        "title": "Domain-based Message Authentication, Reporting, and Conformance (DMARC) Aggregate Reporting",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "A. Brotman",
            "isEditor": true
          }
        ],
        "disposition": "in_progress",
        "labels": [],
        "clusters": [539],
        "assignmentsByRoles": [],
        "pages": 39,
        "enqueuedAtIso": "2025-03-18T12:00:00.000Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-radext-radiusdtls-bis",
        "title": "RadSec: RADIUS over Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Jan-Frederik Rieckers",
            "isEditor": false
          },
          {
            "titlepageName": "Margaret Cullen",
            "isEditor": false
          },
          {
            "titlepageName": "Stefan Winter",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "deadlineIso": "2026-05-18T00:00:00.000Z",
        "labels": [],
        "clusters": [552],
        "assignmentsByRoles": [
          {
            "role": "enqueuer"
          }
        ],
        "pages": 46,
        "enqueuedAtIso": "2026-04-06T16:49:54.252Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-netconf-https-notif",
        "title": "An HTTPS-based Transport for YANG Notifications",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Mahesh Jethanandani",
            "isEditor": false
          },
          {
            "titlepageName": "Kent Watsen",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "deadlineIso": "2026-05-18T00:00:00.000Z",
        "labels": [],
        "clusters": [571],
        "assignmentsByRoles": [
          {
            "role": "enqueuer"
          }
        ],
        "pages": 29,
        "enqueuedAtIso": "2026-04-06T16:55:16.330Z",
        "approvalLogMessages": []
      },
      {
        "name": "draft-ietf-suit-update-management",
        "title": "Update Management Extensions for Software Updates for Internet of Things (SUIT) Manifests",
        "consensus": true,
        "authors": [
          {
            "titlepageName": "Brendan Moran",
            "isEditor": false
          },
          {
            "titlepageName": "Ken Takayama",
            "isEditor": false
          }
        ],
        "disposition": "in_progress",
        "deadlineIso": "2026-05-18T00:00:00.000Z",
        "labels": [],
        "clusters": [535],
        "assignmentsByRoles": [],
        "pages": 24,
        "enqueuedAtIso": "2026-04-06T18:05:02.251Z",
        "approvalLogMessages": []
      }
    ]
  }

  const str = await renderQueueXML(mockQueue)

  // basic sanity check on the response
  expect(str.length).toBeGreaterThan(1000)

  expect(str).toMatchSnapshot()
})